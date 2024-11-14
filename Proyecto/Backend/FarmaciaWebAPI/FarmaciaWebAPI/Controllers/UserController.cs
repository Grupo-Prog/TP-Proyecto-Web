using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Context;
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
    public class UserController : ControllerBase
    {
        private readonly IUserService<T_User> _userService;
        public UserController(IUserService<T_User> userService)
        {
            _userService = userService;
        }

        //to do solo admin
        [HttpGet]

        public async Task<IActionResult> Get([FromBody]bool order = false)
        {
            var response = new RequestResponse();
            try
            {
                var value = await _userService.GetAllAsync();
                if (value == null)
                {
                    response.Success = 0;
                    response.Message = "Data not found or there was an error fetching it";
                    return NotFound(response);
                }
                response.Success = 1;
                response.Message = "Data fetched";
                response.Data = value;
                return Ok(response);
            }
            catch (Exception ex)
            {
                string innerEx = "";
                if (ex.InnerException != null) { innerEx = ex.InnerException.Message; }
                return Problem(
                title: $"Internal error: {ex.Message}",
                detail: innerEx,
                instance: $"{HttpContext.Request.GetEncodedUrl()}",
                statusCode: 500
                );
            }
        }

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
                var userResponse = await _userService.Auth(request);
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
                return Ok(response);
                //devolvemos la respuesta junto con el codigo http

            }
            catch (Exception ex)
            {
                string innerEx = "";
                if (ex.InnerException != null) { innerEx = ex.InnerException.Message; }
                return Problem(
                title: $"Internal error: {ex.Message}",
                detail: innerEx,
                instance: $"{HttpContext.Request.GetEncodedUrl()}",
                statusCode: 500
                );

            }
        }

        [AllowAnonymous]
        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] string value)
        {
            var response = new RequestResponse();
            try
            {
                if(!await _userService.Register())
                {
                    response.Success = 0;
                    response.Message = "Could not register, verify body parameters";
                    return BadRequest(response);
                }
                response.Success = 1;
                response.Message = "User registered correctly";
                return Ok(response);
            }
            catch (Exception ex)
            {
                string innerEx = "";
                if (ex.InnerException != null) { innerEx = ex.InnerException.Message; }
                return Problem(
                title: $"Internal error: {ex.Message}",
                detail: innerEx,
                instance: $"{HttpContext.Request.GetEncodedUrl()}",
                statusCode: 500
                );
            }
        }

        //to do solo admin
        [HttpDelete("User/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                return Ok("to do");
            }
            catch (Exception ex)
            {
                string innerEx = "";
                if (ex.InnerException != null) { innerEx = ex.InnerException.Message; }
                return Problem(
                title: $"Internal error: {ex.Message}",
                detail: innerEx,
                instance: $"{HttpContext.Request.GetEncodedUrl()}",
                statusCode: 500
                );
            }
        }
    }
}
