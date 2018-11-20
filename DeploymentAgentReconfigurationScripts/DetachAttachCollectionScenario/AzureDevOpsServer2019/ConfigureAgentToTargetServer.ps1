<# 
This script is applicable for AzureDevOpsServer 2019 or later.
This is a guidance script to re-configure deployment group agents to the target AzureDevOpsServer after detach/attach activity. This script is applicable if the source collection is not online. If source AzureDevOpsServer collection is online (Side by Side scenario), use ConfigureAgentToTargetServerUsingSourceServer,ps1 script instead.

Inputs:
1. targetServerUrl : New AzureDevOpsServer instance url.
2. targeServerPatToken : PAT token from target AzureDevOpsServer with Deployment group manage scope (at least)
3. existingAgentFolder: The script will Auto-detect the agent folder if it was running as windows service. User need to pass the folder path otherwise.
4. agentDownloadUrl: this is optional, user can specify if she wants any specific agent version to be installed.
5. tags : Tags of the target. Since the source AzureDevOpsServer is not available, user need to pass the tags explicitly.
5. action: By default, the script will not do any update operation, it will just print what changes will happen after the script is applied. User need to set action parameter to 'apply' to update execute actual steps.

Output:
If action is set to apply, this script this script will
1. Configure a new agent to the deployment group in the target AzureDevOpsServer with same properties as the existing agent in the source AzureDevOpsServer.
Example usage:
.\ConfigureAgentToTargetServer.ps1 -targetServerUrl <newAzureDevOpsServerUrl> -targeServerPatToken <PAT-for-new-AzureDevOpsServer>
.\ConfigureAgentToTargetServer.ps1 -targetServerUrl <newAzureDevOpsServerUrl> -targeServerPatToken <PAT-for-new-AzureDevOpsServer> -existingAgentFolder <AgentFoilder (C:\vstsagents\A1)> -tags 'Web,DB'
.\ConfigureAgentToTargetServer.ps1 -targetServerUrl <newAzureDevOpsServerUrl> -targeServerPatToken <PAT-for-new-AzureDevOpsServer> -existingAgentFolder <AgentFoilder (C:\vstsagents\A1)> -action 'apply'
#>

param([string]$targetServerUrl,
      [string]$targeServerPatToken,
      [string]$existingAgentFolder = "",
      [string]$agentDownloadUrl = 'https://vstsagentpackage.azureedge.net/agent/2.141.1/vsts-agent-win-x64-2.141.1.zip',
      [string]$tags = "",
      [string]$action = "PrintEffect")

$ErrorActionPreference="Stop"
$apiVersion = '5.0-preview.1'

# Basic validations
If (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent() ).IsInRole( [Security.Principal.WindowsBuiltInRole] “Administrator”)){ 
    throw "Run command in an administrator PowerShell prompt"
};

If ($PSVersionTable.PSVersion -lt (New-Object System.Version("3.0"))){
    throw "The minimum version of Windows PowerShell that is required by the script (3.0) does not match the currently running version of Windows PowerShell."
}

# Auto detect existing agent folder
if ($existingAgentFolder -eq ""){
    $ServiceNamePrefix = 'vstsagent*'
    $agentServices = Get-Service -Name $ServiceNamePrefix
    if ($agentServices.Count -eq 1){
        $serviceName = $agentServices[0].Name;
        $service = get-wmiobject -query "select * from win32_service where name = `'$serviceName`'";
        $serviceExePath = $service.pathname;
        # $serviceExePath will have value like "C:\vstsAgent2\A8\bin\AgentService.exe"
        $existingAgentFolder = Split-Path (Split-Path $serviceExePath -Parent) -Parent;
    }
}

if ($existingAgentFolder -eq ""){
    throw "Not able to auto detect existing agent folder. Provide the existingAgentFolder as input parameter. You can find it in agent capabilities UI as Agent.HomeDirectory.  Generally it is in C:\vstsagent folder.";
}

cd $existingAgentFolder;

if (-not (Test-Path '.\.agent')){
    throw "No agent installed in this path. Please run this script from Agent Home Directory. Generally it is in C:\vstsagent folder."
}


# Collect information about the existing agent
$sourceServerUrl = "NoAbleToReadAgentFile"
$collectionName = "NoAbleToReadAgentFile"
$projectName = "NoAbleToReadAgentFile"
$deploymentGroupId = "NoAbleToReadAgentFile"
$deploymentGroupName = "NoAbleToReadAgentFile"
$agentName = "NoAbleToReadAgentFile"

$agentproperties = Get-Content .\.agent |ConvertFrom-Json
$sourceServerUrl = $agentproperties.serverUrl;
$collectionName = $agentproperties.collectionName;
$projectName = $agentproperties.projectId;
$deploymentGroupId = $agentproperties.deploymentGroupId;
$agentName = $agentproperties.agentName;

if ($sourceServerUrl.StartsWith($targetServerUrl)){
    Write-Verbose -Verbose "Agent $agentName is already configured to the AzureDevOpsServer $targetServerUrl";
    return 0;
}

# Get the Deployment group name
$encodedPat = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(":$targeServerPatToken"))
$getDeploymentGroupUrl = $targetServerUrl + '/' + $collectionName + '/' + $projectName + '/_apis/distributedtask/deploymentgroups/' + $deploymentGroupId + '?api-version=' + $apiVersion
 
$dg = Invoke-RestMethod -Uri $getDeploymentGroupUrl -Method Get -Headers @{Authorization = "Basic $encodedPat"} -ContentType "application/json"
$deploymentGroupName = $dg.name


# Create and go to new agent folder
$parentPath = Split-Path $existingAgentFolder -Parent
cd $parentPath
$newAgentFolfer = "";

for ($i=1; $i -lt 100; $i++){
    $destFolder="A"+$i.ToString();
    if (-NOT (Test-Path ($destFolder))){
        $newAgentFolfer = $destFolder;
        break;
    }
};

$newAgentPath = $parentPath + $newAgentFolfer;

if ($action -ne "apply"){
    Write-Verbose -Verbose "If action is set to apply, this script will configure an agent with name $agentName and tags $tags in $newAgentPath path to the deployment group $deploymentGroupName in the AzureDevOpsServer $targetServerUrl with same properties as the existing agent $agentName in the source AzureDevOpsServer $sourceServerUrl.";
    return 0;
}

Write-Verbose -Verbose "Start execution : It will configure an agent with name $agentName and tags $tags in $newAgentPath path to the deployment group $deploymentGroupName in the AzureDevOpsServer $targetServerUrl with same properties as the existing agent $agentName in the source AzureDevOpsServer $sourceServerUrl.";
mkdir $newAgentFolfer;
cd $newAgentFolfer; 

# download the agent bits.
$agentZip= $agentZip="$PWD\agent.zip";
$DefaultProxy=[System.Net.WebRequest]::DefaultWebProxy;$securityProtocol=@();
$securityProtocol+=[Net.ServicePointManager]::SecurityProtocol;
$securityProtocol+=[Net.SecurityProtocolType]::Tls12;[Net.ServicePointManager]::SecurityProtocol=$securityProtocol;
$WebClient=New-Object Net.WebClient;
    
if($DefaultProxy -and (-not $DefaultProxy.IsBypassed($agentDownloadUrl)))
{
    $WebClient.Proxy= New-Object Net.WebProxy($DefaultProxy.GetProxy($agentDownloadUrl).OriginalString, $True);
};

$WebClient.DownloadFile($agentDownloadUrl, $agentZip);

Add-Type -AssemblyName System.IO.Compression.FileSystem;[System.IO.Compression.ZipFile]::ExtractToDirectory( $agentZip, "$PWD"); 
	

# configure the agent
if ($tags -ne ""){
    .\config.cmd --deploymentgroup --url $targetServerUrl --collectionname $collectionName --projectname $projectName --deploymentgroupname $deploymentGroupName --agent $agentName --auth Integrated --runasservice --work '_work' --unattended --adddeploymentgrouptags --deploymentgrouptags $tags
}
else{
    .\config.cmd --deploymentgroup --url $targetServerUrl --collectionname $collectionName --projectname $projectName --deploymentgroupname $deploymentGroupName --agent $agentName --auth Integrated --runasservice --work '_work' --unattended
}