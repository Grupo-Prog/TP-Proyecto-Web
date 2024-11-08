using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;


namespace FarmaciaWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MasterController : ControllerBase
    {

        [HttpGet]
        public async Task<IActionResult> Get()
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

        
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
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
