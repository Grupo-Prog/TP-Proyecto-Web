using Microsoft.AspNetCore.Authorization;
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
            catch
            {

                throw new NotImplementedException();
            }
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok("To do");
            }
            catch
            {

                throw new NotImplementedException();
            }
        }

        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] string value)
        {
            try
            {
                return Ok("To do");
            }
            catch
            {

                throw new NotImplementedException();
            }
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string value)
        {
            try
            {
                return Ok("To do");
            }
            catch
            {

                throw new NotImplementedException();
            }
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                return Ok("To do");
            }
            catch
            {

                throw new NotImplementedException();
            }
        }
    }
}
