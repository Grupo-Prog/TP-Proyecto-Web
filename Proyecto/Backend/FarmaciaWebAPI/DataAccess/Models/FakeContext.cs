using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    //Test para probar
    //reemplazar por entity framework
    //to do
    public class FakeContext : DbContext
    {

        public List<User> Users;
        public class User
        {
            public int Id { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
        }
        public FakeContext()
        {
            
            Users =
            [
                //hola mundo
                new User { Id = 1, Username = "mudo", Password = "0b894166d3336435c800bea36ff21b29eaa801a52f584c006c49289a0dcf6e2f" },
                //111
                new User { Id = 2, Username = "mateo", Password = "f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae" },
                //1234
                new User { Id = 3, Username = "juan", Password = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4" },
                //test
                new User { Id = 4, Username = "test", Password = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" },
            ];

        }
    }
}
