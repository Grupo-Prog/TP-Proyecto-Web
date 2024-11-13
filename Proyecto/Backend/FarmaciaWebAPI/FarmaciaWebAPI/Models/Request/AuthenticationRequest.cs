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
        public required string Email { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}
