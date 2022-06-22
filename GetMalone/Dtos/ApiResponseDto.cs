using System.Text.Json.Serialization;

namespace GetMalone.Dtos
{
    public class ApiResponseDto
    {
        public bool Success { get; set; } = true;
        public string Error { get; set; } = null;
        [JsonIgnore] public string StackTrace { get; set; } = null;
        public object Data { get; set; } = null;
        public ApiResponseDto() { }
        public ApiResponseDto(Action func, string? error = null)
        {
            try
            {
                func = func ?? throw new ArgumentNullException(nameof(func));
                Success = true;
            }
            catch (Exception ex)
            {
                Error = error ?? ex.InnerException?.Message ?? ex.Message;
                StackTrace = ex.InnerException?.StackTrace ?? ex.StackTrace;
                Success = false;
            }
        }
        public ApiResponseDto(Func<object> func, string? error = null)
        {
            try
            {
                func = func ?? throw new ArgumentNullException(nameof(func));
                Data = func();
                Success = true;
            }
            catch (Exception ex)
            {
                Error = error ?? ex.InnerException?.Message ?? ex.Message;
                StackTrace = ex.InnerException?.StackTrace ?? ex.StackTrace;
                Success = false;
            }
        }
    }
}
