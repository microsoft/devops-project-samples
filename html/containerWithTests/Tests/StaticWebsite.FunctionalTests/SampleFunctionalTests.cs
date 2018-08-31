using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using System;

namespace StaticWebsite.FunctionalTests
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

        [TestMethod]
        public void SampleFunctionalTest1()
        {
            try
            {
                driver = GetChromeDriver();
                var webAppUrl = testContext.Properties["webAppUrl"].ToString();
                driver.Navigate().GoToUrl(webAppUrl);
                Assert.AreEqual("HTML Application", driver.Title, "Expected title to be 'HTML Application'");
            }
            finally
            {
                driver.Quit();
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
