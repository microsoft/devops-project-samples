using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using System;
using System.IO;
using System.Threading;

namespace SampleWebApplication.FunctionalTests
{
    [TestClass]
    public class SampleFunctionalTests
    {
        private static TestContext testContext;
        private RemoteWebDriver driver;

        [ClassInitialize]
        public static void Initialize(TestContext testContext)
        {
            SampleFunctionalTests.testContext = testContext;
        }

        [TestInitialize]
        public void TestInit()
        {
            driver = GetChromeDriver();
            driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(120);
        }

        [TestCleanup]
        public void TestClean()
        {
            driver.Quit();
        }

        [TestMethod]
        [Timeout(600000)]
        public void SampleFunctionalTest1()
        {
            var webAppUrl = testContext.Properties["webAppUrl"].ToString();
            var startTimestamp = DateTime.Now.Millisecond;
            var endTimestamp = startTimestamp + 60 * 10 * 1000;
            while (true)
            {
                try
                {
                    driver.Navigate().GoToUrl(webAppUrl);
                    Assert.AreEqual("Home Page - My ASP.NET Application", driver.Title, "Expected title to be 'Home Page - My ASP.NET Application'");
                    break;
                }
                catch
                {
                    var currentTimestamp = DateTime.Now.Millisecond;
                    if(currentTimestamp > endTimestamp)
                    {
                        throw;
                    }
                    Thread.Sleep(5000);
                }
            }
            var filePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString()) + ".png";
            var screenshot = driver.GetScreenshot();
            screenshot.SaveAsFile(filePath);
            testContext.AddResultFile(filePath);
        }

        private RemoteWebDriver GetChromeDriver()
        {
            var path = Environment.GetEnvironmentVariable("ChromeWebDriver");
            var options = new ChromeOptions();
            options.AddArguments("--no-sandbox");

            if (!string.IsNullOrWhiteSpace(path))
            {
                return new ChromeDriver(path, options, TimeSpan.FromSeconds(300));
            }
            else
            {
                return new ChromeDriver(options);
            }
        }
    }
}
