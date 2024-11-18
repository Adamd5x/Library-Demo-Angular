using ErrorOr;
using Library.Abstracts.Core;
using Library.Api.Validators;
using Library.Common;
using Library.Core.Extensions;
using Library.Models;
using Microsoft.AspNetCore.Mvc;

namespace Library.Api.Controllers;

[Route ("api/library")]
[ApiController]
[Produces(MediaTypeNames.Application.Json)]
public class LibraryController(IBookCoreService coreService) : ControllerBase
{
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<BookDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
    public async Task<IActionResult> GetBook ([FromRoute]string id)
    {
        _ = int.TryParse (id, out int passedId);
        bool isIdInvalid =  passedId <= 0;
        if (isIdInvalid) 
        {
            return BadRequest ();
        }

        var result = await coreService.GetAsync(passedId);
        if (result.IsError) 
        {
            if (result.FirstError.Type == ErrorType.NotFound) 
            { 
                return NotFound();
            }
            return BadRequest (GetProblemDetails (result.FirstError));
        }
        return Ok (new ApiResult<BookDto>(true, result.Value));
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<IEnumerable<BookDto>>))]
    [ProducesResponseType (StatusCodes.Status400BadRequest, Type = typeof (ProblemDetails))]
    [ProducesResponseType (StatusCodes.Status404NotFound, Type = typeof (ProblemDetails))]
    public async Task<IActionResult> GetBooks (string sortBy = "Title", string sortOrder = "asc", int offset = 0, int size = 50) {

        bool isSortColumnValid = SortColumnValidator.Validate (sortBy);
        bool isPagingValid = offset >= 0 && size >=0 && size <= 100;
        
        if (!isPagingValid)
        {
            return BadRequest ();
        }

        if (!isSortColumnValid) 
        { 
            return BadRequest();
        }

        var result = await coreService.GetAllAsync(sortBy, sortOrder.ToEnum<SortOrder>(), offset, size);
        if (result.IsError) 
        { 
            return BadRequest (GetProblemDetails (result.FirstError));
        }

        return Ok (new ApiResult<IEnumerable<BookDto>>(!result.IsError, string.Empty, string.Empty, result.Value, new Page(offset, size)));
    }

    [HttpGet("isbn/{isbn}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<bool>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    public async Task<IActionResult> IsIsbnAvailable ([FromRoute] string isbn)
    {
        // TODO ISBN validation

        var result = await coreService.IsIsbnAvailableAsync(isbn);

        return Ok (new ApiResult<bool>(true, result.Value));
    }


    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ApiResult<BookDto>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    public async Task<IActionResult> Create ([FromBody] BookDto model)
    {
        if (!ModelState.IsValid) 
        { 
            return BadRequest ();
        }

        var result = await coreService.CreateAsync (model);

        if (result.IsError) 
        {
            return BadRequest (GetProblemDetails (result.FirstError));
        }

        return Created ("", new ApiResult<BookDto>(true, model));
    }

    [HttpPut("{id}")]
    [ProducesResponseType (StatusCodes.Status200OK, Type = typeof (ApiResult<BookDto>))]
    [ProducesResponseType (StatusCodes.Status400BadRequest, Type = typeof (ProblemDetails))]
    [ProducesResponseType (StatusCodes.Status404NotFound, Type = typeof (ProblemDetails))]
    public async Task<IActionResult> Update ([FromRoute]int id, [FromBody] BookDto model)
    {
        bool isIdInvalid = id <= 0;

        if (!ModelState.IsValid && isIdInvalid) 
        {
            return BadRequest ();
        }

        var result = await coreService.UpdateAsync (id, model);
        if (result.IsError)
        {
            return BadRequest (GetProblemDetails (result.FirstError));
        }
        return Ok (new ApiResult<BookDto>(true, result.Value));
    }


    [HttpPut ("chstate/{id}/{state}")]
    [ProducesResponseType (StatusCodes.Status200OK, Type = typeof (ApiResult<bool>))]
    [ProducesResponseType (StatusCodes.Status400BadRequest, Type = typeof (ProblemDetails))]
    [ProducesResponseType (StatusCodes.Status404NotFound, Type = typeof (ProblemDetails))]
    public async Task<IActionResult> ChangeState ([FromRoute] int id, [FromRoute] string state)
    {
        var result = await coreService.SetState(id, state);
        if (result.IsError)
        {
            return BadRequest (GetProblemDetails (result.FirstError));
        }
        return Ok (new ApiResult<bool>(true, result.Value));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType (StatusCodes.Status400BadRequest, Type = typeof (ProblemDetails))]
    public async Task<IActionResult> Delete ([FromRoute] int id)
    {
        bool isIdInvalid = id <= 0;
        if (isIdInvalid) 
        { 
            return BadRequest ();
        }

        var result = await coreService.DeleteAsync (id);
        if (result.IsError)
        {
            if (result.FirstError.Type == ErrorType.NotFound)
            {
                return NotFound ();
            }
            return BadRequest (GetProblemDetails(result.FirstError));
        }
        return Ok ();
    }

    private static ProblemDetails GetProblemDetails(Error error)
    {
        return  new ProblemDetails ()
        {
            Title = "API Error",
            Detail = error.Description,
            Status = StatusCodes.Status400BadRequest,
            Instance = "API"
        };
    }
}
