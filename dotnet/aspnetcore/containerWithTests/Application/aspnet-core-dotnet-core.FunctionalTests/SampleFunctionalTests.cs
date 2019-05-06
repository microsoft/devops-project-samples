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
            var numRetries = 5;
            for (int i = 0; i < numRetries; i++)
            {
                try
                {
                    driver.Navigate().GoToUrl(webAppUrl);
                    Assert.AreEqual("Home Page - ASP.NET CORE", driver.Title, "Expected title to be 'Home Page - ASP.NET CORE'");
                    break;
                }
                catch
                {
                    if(i == (numRetries - 1))
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
