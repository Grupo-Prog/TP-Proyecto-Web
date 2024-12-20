﻿using Azure;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.DTOs;
using FarmaciaWebAPI.Models.Request;
using FarmaciaWebAPI.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Diagnostics;


namespace FarmaciaWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MasterController : ControllerBase
    {
        private readonly IMasterService _manager;
        public MasterController(IMasterService masterManager)
        {
            _manager = masterManager;
        }
        [HttpGet("Order/{order}")]
        public async Task<IActionResult> Get(bool order = false)
        {
            var response = new RequestResponse();
            try
            {
                var value = await _manager.IsOrdered(order);
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


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var response = new RequestResponse();
            try
            {
                var value = await _manager.GetByIdAsync(id);
                if (value == null)
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
        public async Task<IActionResult> Post([FromBody] MasterSaveRequest request)
        {
            var response = new RequestResponse();
            try
            {

                var result = await _manager.SaveAsync(request.Convert(request.Venta));
                if (result == false)
                {
                    response.Success = 0;
                    response.Message = "Error saving data, check body parameters";
                    return BadRequest(response);
                }
                response.Success = 1;
                response.Message = "Data saved correctly";
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


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] MasterSaveRequest request)
        {
            var response = new RequestResponse();
            try
            {
                var value = request.Convert(request.Venta);
                var result = await _manager.UpdateAsync(id, value);
                if (!result)
                {
                    response.Success = 0;
                    response.Message = "Error updating data, the ID was not found or it does not exist";
                    return BadRequest(response);
                }
                response.Success = 1;
                response.Message = "Data updated correctly";
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


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = new RequestResponse();
            try
            {
                var result = await _manager.DeleteAsync(id);
                if (!result)
                {
                    response.Success = 0;
                    response.Message = "Error deleting data, the ID was not found or it does not exist";
                    return BadRequest(response);
                }
                response.Success = 1;
                response.Message = "Data deleted correctly";
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
    }
}
