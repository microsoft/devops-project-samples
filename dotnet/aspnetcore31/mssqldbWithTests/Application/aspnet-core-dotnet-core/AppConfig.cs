using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace aspnet_core_dotnet_core
{
    public class AppConfig
    {
        public string sqlCS { get; set; }

        public AppConfig(IConfiguration config)
        {
            sqlCS = config.GetConnectionString("defaultConnection");
        }
    }
}
