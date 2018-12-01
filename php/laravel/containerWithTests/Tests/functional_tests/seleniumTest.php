<?php

use PHPUnit\Framework\TestCase;
use Facebook\WebDriver\Chrome;
use Facebook\WebDriver\Remote;

class SeleniumTest extends PHPUnit\Framework\TestCase
{
	private $driver;
	private $webAppUrl;
	protected function SetUp()
	{
		global $argv;
		$webAppCommandLine = $argv[sizeof($argv)-1];  
		$pathChromeWebDriver = getenv('ChromeWebDriver');
		$chromeDriver = $pathChromeWebDriver . DIRECTORY_SEPARATOR . 'chromedriver.exe';
		putenv("webdriver.chrome.driver=$chromeDriver");
		$options = new Chrome\ChromeOptions();
		$options->addArguments(array('--window-size=571,428','--no-sandbox','--headless'));

		$caps = Remote\DesiredCapabilities::chrome();
  		$caps->setCapability(Chrome\ChromeOptions::CAPABILITY, $options);

		$this->webAppUrl = explode('=', $webAppCommandLine)[1];		
		$this->driver = Chrome\ChromeDriver::start($caps);
	}

	public function testTitle()
	{
		try
		{
			$this->driver->get($this->webAppUrl);
			$this->assertContains("Laravel", $this->driver->getTitle());
		}
		catch(Exception $e)
		{
			$this->fail('testTitle.Error occurred while executing tests: ' .$e->getMessage());
		}
		
	}

	protected function tearDown()
    {
    	try
    	{
    		$this->driver->quit();
    	}
		catch(Exception $e)  
		{
			echo 'TearDown.Error occurred while trying to close the selenium chrome driver:' .$e->getMessage();
		} 
	}
}
