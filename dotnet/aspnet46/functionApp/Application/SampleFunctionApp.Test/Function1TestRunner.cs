using Should.Fluent;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace SampleFunctionApp.Test
{
    public class Function1TestRunner
    {

        FakeTraceWriter fakeTraceWriter = new FakeTraceWriter();

        [Fact]
        async Task HttpTriggerWithoutParams()
        {
            HttpRequestMessage request = new HttpRequestMessage();
            request.Content = new StringContent("{}", System.Text.Encoding.UTF8, "application/json");
            request.SetConfiguration(new System.Web.Http.HttpConfiguration());
            var result = await Function1.Run(request, fakeTraceWriter);
            (await result.Content.ReadAsStringAsync()).Should().Equal("\"Hello there! Welcome to Azure Functions!\"");
        }

        [Fact]
        async Task HttpTriggerWithParams()
        {
            HttpRequestMessage request = new HttpRequestMessage();
            request.Content = new StringContent("{'name': 'Bill'}", System.Text.Encoding.UTF8, "application/json");
            request.SetConfiguration(new System.Web.Http.HttpConfiguration());
            var result = await Function1.Run(request, fakeTraceWriter);
            (await result.Content.ReadAsStringAsync()).Should().Equal($"\"Hello Bill! Welcome to Azure Functions!\"");
        }
    }
}
