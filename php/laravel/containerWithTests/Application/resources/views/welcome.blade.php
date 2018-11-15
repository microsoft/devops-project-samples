<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html,
        body {
            height: 100%;
            width: 100%;
            padding: 0;
            margin: 0;
        }
        @font-face{
            font-family: "Segoe UI";
            src: url('../assets/fonts/segoeuil.ttf');
        }
        .main-container {
            height: 100%;
            width: 100%;
            background-color: #1d539d;
            color: white;
            padding-top: 6%;
            box-sizing: border-box;
            overflow-y: auto;
            overflow-x: hidden;
            font-family: "Segoe UI";
        }

        .cloud-image {
            width: 1200px;
            height: 250px;
            padding-bottom: 50px;
            margin: auto;
        }

        .success-text {
            padding-bottom: 20px;
            font-size: 62px;
            line-height: 73px;
        }

        .description {
            font-size: 34px;
            line-height: 40px;
        }

        .next-steps-container {
            padding-top: 50px;
        }

        .next-steps-header {
            font-size: 24px;
            line-height: 28px;
            padding-bottom: 25px;
        }

        .next-steps-body {
            display: flex;
            flex-direction: column;
        }

        .step {
            display: flex;
            margin: 7px 0px;
            font-size: 15px;
            line-height: 21px;
        }

        .step-icon {
            height: 20px;
            width: 20px;
            margin-right: 10px;
        }
		
		.step-text a {
            color: white;
			text-decoration: none;
        }
		
		.step-text a:hover {
            color: white;
			text-decoration:underline;
        }

        .content {
            box-sizing: border-box;
            min-width: 700px;
            max-width: 830px;
            position: relative;
            margin: auto;
        }

        .tweet-container {
            min-width: 30px;
            min-height: 100px;
            margin: 0 20px;
            position: absolute;
            left: -100px;
            top: 110px;
        }
        .content-body{
            min-width: 400px;
        }

        @media (max-width: 1024px) {
            .main-container{
                padding-top: 1%;
            }
            .cloud-image {
                padding-bottom: 30px;
            }
            .next-steps-container {
                padding-top: 30px;
            }
            .next-steps-header {
                padding-bottom: 20px;
            }
            .success-text {
                font-size: 50px;
                line-height: 61px;
                padding-bottom: 10px;
            }
            .description {
                font-size: 26px;
                line-height: 30px;
            }

            .step {
                font-size: 12px;
                line-height: 18px;
            }
            .tweet-container {
                top: 80px;
            }
            .content{
                max-width: 630px;
                min-width: 630px;
            }
        }
        </style>
    </head>
    <body>
        <div class="main-container">
        <div class="cloud-image">
            <img src="../assets/img/successCloudNew.svg">            
        </div>
        <div class="content">
            <div class="tweet-container">
            <a href="http://twitter.com/intent/tweet/?text=I%20just%20created%20a%20new%20PHP%20Laravel%20website%20on%20Azure%20using%20Azure%20DevOps%20Project&hashtags=AzureDevOpsProject%2CVSTS%20%40Azure%20%40VSTS">
                <img src="../assets/img/tweetThis.svg" />
            </a>            
        </div>
            <div class="content-body">
                <div class="success-text">Success!</div>
                <div class="description line-1"> Azure DevOps Project has been successfully setup</div>
                <div class="description line-2"> Your PHP Laravel app is up and running on Azure</div>
                <div class="next-steps-container">
                    <div class="next-steps-header">Next up</div>
                    <div class="next-steps-body">
                        <div class="step">
                            <div class="step-icon">
                                <img src="../assets/img/cloneWhite.svg">
                            </div>
                            <div class="step-text"><a href="https://go.microsoft.com/fwlink/?linkid=862409">Clone your code repository and start developing your application on IDE of your choice</a></div>
                        </div>
                        <div class="step">
                            <div class="step-icon">
                                <img src="../assets/img/deployWhite.svg">
                            </div>
                            <div class="step-text"><a href="https://go.microsoft.com/fwlink/?linkid=862410">View your CI/CD pipeline on Azure Devops and customize it as per your needs</a></div>
                        </div>
                        <div class="step">
                            <div class="step-icon">
                                <img src="../assets/img/stackWhite.svg">
                            </div>
                            <div class="step-text"><a href="http://portal.azure.com">View your service stack in the Azure Portal</a></div>
                        </div>
                        <div class="step">
                            <div class="step-icon">
                                <img src="../assets/img/lightbulbWhite.svg">
                            </div>
                            <div class="step-text"><a href="https://go.microsoft.com/fwlink/?linkid=862126">Learn more about all you can do with Azure projects by visiting the documentation</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </body>
</html>
