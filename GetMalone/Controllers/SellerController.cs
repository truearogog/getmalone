using GetMalone.Data;
using GetMalone.Dtos;
using GetMalone.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace GetMalone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;

        public SellerController(
            IUserRepository userRepository, JwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        [HttpGet("all")]
        public IActionResult GetAllSellers()
        {
            var response = new ApiResponseDto(() =>
            {
                return _userRepository.GetAllSellers();
            });
            return Ok(response);
        }

        [HttpPost("get")]
        public IActionResult GetSellerById([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                return _userRepository.GetSellerById(dto.Id);
            });
            return Ok(response);
        }
    }
}
