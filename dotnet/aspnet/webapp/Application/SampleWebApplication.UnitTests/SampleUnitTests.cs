using Microsoft.VisualStudio.TestTools.UnitTesting;
using SampleWebApplication.Controllers;
using System.Web.Mvc;

namespace SampleWebApplication.UnitTests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void AboutPageTest()
        {
            var controller = new HomeController();
            ActionResult result = controller.About();
            Assert.AreEqual("Your application description page.", controller.ViewBag.Message);
        }

        [TestMethod]
        public void ContactPageTest()
        {
            var controller = new HomeController();
            ActionResult result = controller.Contact();
            Assert.AreEqual("Your contact page.", controller.ViewBag.Message);
        }
    }
}
