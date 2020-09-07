using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Data.SqlClient;
using System.Diagnostics;

namespace aspnet_core_dotnet_core.Pages
{
    public class ContactModel : PageModel
    {
        public string sqlCS;
        public ContactModel(AppConfig appconfig)
        {
            sqlCS = appconfig.sqlCS;
        }
        
        public void OnGet()
        {
            try
            {
                using (SqlConnection sqlconnection = new SqlConnection(sqlCS))
                {
                    sqlconnection.Open();

                    var sql = "INSERT INTO accessLogs (PageName) VALUES ('Contact'); ";
                    var command = new SqlCommand(sql, sqlconnection);
                    int rowsAffected = command.ExecuteNonQuery();

                    sqlconnection.Close();
                }
            }
            catch (SqlException e)
            {
                Debug.WriteLine(e.Message);
                throw;
            }
        }
    }
}