using Azure;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.DTOs;
using FarmaciaWebAPI.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;


namespace FarmaciaWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MasterController : ControllerBase
    {
        private readonly IManager<MasterDTO> _manager;
        public MasterController(IManager<MasterDTO> masterManager)
        {
            _manager = masterManager;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = new RequestResponse();
            try
            {
                var value = await _manager.GetAllAsync();
                if (value == null)
                {
                    response.Success = 0;
                    response.Message = "Data is null. Was not found or there was an error fetching it";
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
                var value = await _manager.GetByIdAsync(id);
                if(value == null)
                {
                    response.Success = 0;
                    response.Message = "Data is null. Was not found or there was an error fetching it";
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
        public async Task<IActionResult> Post([FromBody] string value)
        {
            try
            {
                return Ok("To do");
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
        public async Task<IActionResult> Put(int id, [FromBody] string value)
        {
            try
            {
                return Ok("To do");
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
            try
            {
                return Ok("To do");
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
    }
}
