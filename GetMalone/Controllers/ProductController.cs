using GetMalone.Data;
using GetMalone.Dtos;
using GetMalone.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace GetMalone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ISellerRepository _sellerRepository;
        private readonly IProductRepository _productRepository;
        private readonly IProductCategoryRepository _productCategoryRepository;
        private readonly JwtService _jwtService;

        public ProductController(
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

        [HttpGet("allproducts")]
        public IActionResult GetAllProducts()
        {
            var response = new ApiResponseDto(() =>
            {
                var products = _productRepository.GetAll().ToList().Select(product => new {
                    product.Id,
                    product.Name,
                    product.Description,
                    product.Category,
                    product.SellerId,
                    product.PriceEuro
                });
                return products;
            });
            return Ok(response);
        }

        [HttpGet("categoryproducts")]
        public IActionResult GetCategoryProducts([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var products = _productRepository.GetByCategoryId(dto.Id).ToList().Select(product => new {
                    product.Id,
                    product.Name,
                    product.Description,
                    product.Category,
                    product.SellerId,
                    product.PriceEuro
                });
                return products;
            });
            return Ok(response);
        }

        [HttpGet("product")]
        public IActionResult GetProductById([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var product = _productRepository.GetById(dto.Id);
                return new {
                    product.Id,
                    product.Name,
                    product.Description,
                    product.Category,
                    product.SellerId,
                    product.PriceEuro
                };
            });
            return Ok(response);
        }

        [HttpGet("sellerproducts")]
        public IActionResult GetSellerProducts([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var products = _productRepository.GetBySellerId(dto.Id).ToList().Select(product => new {
                    product.Id,
                    product.Name,
                    product.Description,
                    product.Category,
                    product.SellerId,
                    product.PriceEuro
                });
                return products;
            });
            return Ok(response);
        }

        [HttpGet("allcategories")]
        public IActionResult GetAllCategories()
        {
            var response = new ApiResponseDto(() =>
            {
                var productCategories = _productCategoryRepository.GetAll().ToList();
                return productCategories;
            });
            return Ok(response);
        }

        [HttpPost("addproduct")]
        public IActionResult AddProduct([FromBody] AddProductDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var userId = int.Parse(token.Issuer);
                var seller = _sellerRepository.GetById(userId);
                if (seller == null) throw new Exception();

                var product = _productRepository.Create(new Product
                {
                    Created = DateTime.Now,
                    SellerId = userId,
                    Seller = seller,
                    Name = dto.Name,
                    Description = dto.Description,
                    CategoryId = dto.CategoryId,
                    Category = _productCategoryRepository.GetById(dto.CategoryId),
                    PriceEuro = dto.PriceEuro
                });

                return new {
                    product.Id,
                    product.Name,
                    product.Description,
                    product.SellerId,
                    product.PriceEuro
                };
            }, "Unauthorized");
            return Ok(response);
        }

        [HttpPost("deleteproduct")]
        public IActionResult DeleteProduct([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var userId = int.Parse(token.Issuer);
                var seller = _sellerRepository.GetById(userId);
                if (seller == null) throw new Exception();

                var product = _productRepository.GetById(dto.Id);
                if (product.SellerId != userId) throw new Exception();

                _productRepository.Delete(product);
            }, "Unauthorized");
            return Ok(response);
        }
    }
}
