using GetMalone.Data;
using GetMalone.Dtos;
using GetMalone.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace GetMalone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly IDeliveryRepository _deliveryRepository;
        private readonly JwtService _jwtService;

        public DeliveryController(IDeliveryRepository deliveryRepository, JwtService jwtService)
        {
            _deliveryRepository = deliveryRepository;
            _jwtService = jwtService;
        }

        [HttpGet("alloptions")]
        public IActionResult GetAllOptions()
        {
            var response = new ApiResponseDto(() =>
            {
                return _deliveryRepository.GetAllOptions().ToList();
            });
            return Ok(response);
        }

        [HttpGet("allcompanies")]
        public IActionResult GetAllCompanies()
        {
            var response = new ApiResponseDto(() =>
            {
                return _deliveryRepository.GetAllCompanies().ToList();
            });
            return Ok(response);
        }

        [HttpGet("alltypes")]
        public IActionResult GetAllTypes()
        {
            var response = new ApiResponseDto(() =>
            {
                return _deliveryRepository.GetAllTypes().ToList();
            });
            return Ok(response);
        }
    }
}
