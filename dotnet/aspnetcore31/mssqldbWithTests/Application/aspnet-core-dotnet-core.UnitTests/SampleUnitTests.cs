using aspnet_core_dotnet_core.Pages;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.VisualStudio.TestTools.UnitTesting;
    
namespace aspnet_core_dotnet_core.UnitTests
{
    [TestClass]
    public class SampleUnitTests
    {
        [TestMethod]
        public void IndexPageTest()
        {
            AppConfig appconfig = new AppConfig(null);
            IndexModel model = new IndexModel(appconfig);
            Assert.AreEqual("Index", actual: model.DoTest());
        }

    }
}
