using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using System;
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
            var endTimstamp = startTimestamp + 60 * 10 * 1000;

            while (true)
            {
                try
                {
                    driver.Navigate().GoToUrl(webAppUrl);
                    Assert.AreEqual("Home Page - ASP.NET Core", driver.Title, "Expected title to be 'Home Page - ASP.NET Core'");
                    break;
                }
                catch
                {
                    var currentTimestamp = DateTime.Now.Millisecond;
                    if(currentTimestamp > endTimstamp)
                    {
                        throw;
                    }
                    Thread.Sleep(5000);
                }
            }
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