namespace Library.Common;

public class ApiResult<TDto> (bool success)
{
    public bool Success => success;
    public string? Error { get; }
    public string? Code { get; }
    public TDto? Data { get; }
    public Page? Page { get; }

    public ApiResult (bool success, string error, string code): this (success)
    {
        Error = error;
        Code = code;
    }

    public ApiResult(bool success, TDto data): this(success)
    {
        Data = data;
    }

    public ApiResult (bool success, string error, string code, TDto data) : this (success, error, code)
    {
        Data = data;
    }

    public ApiResult(bool success, string error, string code, TDto data, Page page): this(success, error, code, data)
    {
        Page = page;
    }
}
