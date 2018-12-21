using Microsoft.Azure.WebJobs.Host;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace SampleFunctionApp.Test
{
    public class FakeTraceWriter : TraceWriter
    {
        public FakeTraceWriter() : base(TraceLevel.Verbose)
        {

        }
        public override void Trace(TraceEvent traceEvent)
        {
            Debug.WriteLine(traceEvent.Message);
        }
    }
}
