using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FarmaciaWebAPI.Models.Request
{
    public class AuthenticationRequest
    {
        // peticiones necesarias para la autenticacion del login
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
