using Library.Common;
using Microsoft.AspNetCore.Mvc;

namespace Library.Api.Controllers;

[Route ("api/config")]
[ApiController]
[Produces (MediaTypeNames.Application.Json)]
public class ConfigController : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<string>))]
    public IActionResult GetConfig()
    {
        Dictionary<EndpointTypes, string> endpoints = new()
        {
            {EndpointTypes.Statistics, "api/home" },
            {EndpointTypes.Library, "api/library" }
        };

        return Ok (new ApiResult<ConfigResponse>(true, new(endpoints)));
    }
}
