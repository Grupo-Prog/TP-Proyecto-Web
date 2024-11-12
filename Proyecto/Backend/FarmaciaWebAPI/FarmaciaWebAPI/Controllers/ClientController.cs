using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.DTOs;
using FarmaciaWebAPI.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;
using Newtonsoft.Json.Linq;


namespace FarmaciaWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ClientController : ControllerBase
    {
        private readonly IManager<ClientDTO> _manager;
        public ClientController(IManager<ClientDTO> clienteManager)
        {
            _manager = clienteManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = new RequestResponse();
            try
            {
                var value = await _manager.GetAll();
                if (value == null || value.Count == 0)
                {
                    response.Success = 0;
                    response.Message = "Data not found or there was an error fetching it";
                    return NotFound(response);
                };
                response.Success = 1;
                response.Message = "Data fetched";
                response.Data = value;
                return Ok(response);
            }
            catch (Exception ex)
            {

                return Problem(
                    detail: ex.Message,
                    instance: $"{HttpContext.Request.GetEncodedUrl()}",
                    statusCode: 500, title: "Internal error"
                    );
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var response = new RequestResponse();
            try
            {
                var value = await _manager.GetById(id);
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
                return Problem(
                    detail: ex.Message,
                    instance: $"{HttpContext.Request.GetEncodedUrl()}",
                    statusCode: 500, title: "Internal error"
                    );
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ClientDTO value)
        {
            var response = new RequestResponse();
            try
            {
                var result = await _manager.Save(value);
                if (result == false)
                {
                    response.Success = 0;
                    response.Message = "Error saving data, check body parameters";
                    response.Data = value;
                    return BadRequest(response);
                }
                response.Success = 1;
                response.Message = "Object saved correctly";
                response.Data = value.ToString();
                //to do corregir el valor que se muestra
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Problem(
                    detail: ex.Message,
                    instance: $"{HttpContext.Request.GetEncodedUrl()}",
                    statusCode: 500, title: "Internal error"
                    );
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ClientDTO value)
        {
            var response = new RequestResponse();
            try
            {
                var result = await _manager.Update(id, value);
                if (result == false)
                {
                    response.Success = 0;
                    response.Message = "Error updating data, check body parameters";
                    response.Data = value;
                    return BadRequest(response);
                }
                response.Success = 1;
                response.Message = "Object updated correctly";
                response.Data = value.ToString();
                //to do corregir el valor que se muestra
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Problem(
                    detail: ex.Message,
                    instance: $"{HttpContext.Request.GetEncodedUrl()}",
                    statusCode: 500, title: "Internal error"
                    );
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = new RequestResponse();
            try
            {
                var result = await _manager.Delete(id);
                if (result == false)
                {
                    response.Success = 0;
                    response.Message = "Error deleting data, the id does not exist or was not found";
                    return BadRequest(response);
                }
                response.Success = 1;
                response.Message = "Object deleted correctly";
                
                //to do corregir el valor que se muestra
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Problem(
                    detail: ex.Message,
                    instance: $"api/",
                    statusCode: 500, title: "Internal error"
                    );
            }
        }
    }
}
