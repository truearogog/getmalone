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
        private readonly ISellerRepository _sellerRepository;
        private readonly IProductRepository _productRepository;
        private readonly IProductCategoryRepository _productCategoryRepository;
        private readonly JwtService _jwtService;

        public SellerController(
            IUserRepository userRepository,
            ISellerRepository sellerRepository,
            IProductRepository productRepository,
            IProductCategoryRepository productCategoryRepository,
            JwtService jwtService)
        {
            _userRepository = userRepository;
            _sellerRepository = sellerRepository;
            _productRepository = productRepository;
            _productCategoryRepository = productCategoryRepository;
            _jwtService = jwtService;
        }

        [HttpGet("allsellers")]
        public IActionResult GetAllSellers()
        {
            var response = new ApiResponseDto(() =>
            {
                var sellers = _sellerRepository.GetAll().ToList();
                return sellers;
            });
            return Ok(response);
        }

        [HttpPost("seller")]
        public IActionResult GetSellerById([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var seller = _sellerRepository.GetById(dto.Id);
                return seller;
            });
            return Ok(response);
        }
    }
}
