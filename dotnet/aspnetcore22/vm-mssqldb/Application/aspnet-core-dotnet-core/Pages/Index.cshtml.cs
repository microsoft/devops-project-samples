using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Diagnostics;

namespace aspnet_core_dotnet_core.Pages
{
    public class IndexModel : PageModel
    {
        public string sqlCS;
        public string HitCount;
        public string LastAccessDate;
        
        public IndexModel(AppConfig appconfig)
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

                    var sql = "INSERT INTO accessLogs (PageName) VALUES ('Home'); ";
                    var command = new SqlCommand(sql, sqlconnection);
                    int rowsAffected = command.ExecuteNonQuery();


                    var sql2 = "SELECT TOP 1 * FROM accessLogs ORDER BY AccessDate DESC";
                    var command2 = new SqlCommand(sql2, sqlconnection);

                    using (SqlDataReader reader = command2.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            String[] formats = { @"MM\/dd\/yyyy HH:mm:ss" };
                            DateTime AccessDate = ((DateTime)reader["AccessDate"]);
                            LastAccessDate = AccessDate.ToString(formats[0]);

                            HitCount = reader["ID_column"].ToString();

                        }
                    }

                    sqlconnection.Close();
                }
            }
            catch (SqlException e)
            {
                Debug.WriteLine(e.Message);
                throw;
            }
        }

        public string DoTest()
        {
            return "Index";
        }
    }
}