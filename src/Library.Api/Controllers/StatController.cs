using ErrorOr;
using Library.Abstracts.Core;
using Library.Common;
using Microsoft.AspNetCore.Mvc;

namespace Library.Api.Controllers
{
    [Route ("api/stat")]
    [ApiController]
    public class StatController(IStatCoreService coreService) : ControllerBase
    {

        [HttpGet]
        [ProducesResponseType (StatusCodes.Status200OK, Type = typeof (ApiResult<StatDto>))]
        public async Task<IActionResult> GetStat ()
        {
            ErrorOr<StatDto> result = await coreService.GetStatAsync();
            if (result.IsError)
            {
                return BadRequest ();
            }
            return Ok (new ApiResult<StatDto>(true, result.Value));
        }
    }
}
