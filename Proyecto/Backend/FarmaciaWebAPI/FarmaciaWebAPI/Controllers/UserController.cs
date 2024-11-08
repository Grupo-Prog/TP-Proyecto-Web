using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.Request;
using FarmaciaWebAPI.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace FarmaciaWebAPI.Controllers
{
    [ApiController]
    [Authorize]

    [Route("api/[controller]")]
    public class UserController(IUserService userService) : ControllerBase
    {
        // public UserController(IUserService userService)
        // {
        //     _userService = userService;
        // }

        [AllowAnonymous]
        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] AuthenticationRequest request)
        {
            //creamos la respuesta que devolver� el controlador
            var response = new RequestResponse();

            try
            {
                //le pedimos al servicio que intente autentificar al usuario
                var userResponse = userService.Auth(request);
                //si devuelve null es porque el usuario no est� en la base de datos
                if (userResponse == null)
                {
                    //entonces armamos la respuesta con el contenido que le corresponda
                    response.Success = 0;
                    response.Message = "Invalid Credentials, wrong username or password";
                    //la devolvemos junto con el codigo http
                    return BadRequest(response);
                }

                //si se encuentra el usuario cargamos la respuesta con sus datos
                response.Success = 1;
                response.Message = "Login Successful";
                // el cuerpo de la respuesta tiene los datos del usuario o el token de acceso
                response.Data = userResponse;


            }
            catch (Exception ex)
            {
                return Problem(
                    detail: ex.Message,
                    instance: $"{HttpContext.Request.GetEncodedUrl()}",
                    statusCode: 500, title: "Internal error"
                    );

            }

            //devolvemos la respuesta junto con el codigo http
            return Ok(response);
        }

    }
}
