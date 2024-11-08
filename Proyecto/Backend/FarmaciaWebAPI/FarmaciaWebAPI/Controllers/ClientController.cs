using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FarmaciaWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        // GET: api/<ClientController>
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

        // GET api/<ClientController>/5
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

        // POST api/<ClientController>
        [HttpPost]
        public async Task<IActionResult>  Post([FromBody] string value)
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

        // PUT api/<ClientController>/5
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

        // DELETE api/<ClientController>/5
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
