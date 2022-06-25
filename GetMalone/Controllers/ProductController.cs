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
                var products = _productRepository.GetAll().ToList();
                return products;
            });
            return Ok(response);
        }

        [HttpPost("categoryproducts")]
        public IActionResult GetCategoryProducts([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var products = _productRepository.GetByCategoryId(dto.Id).ToList();
                return products;
            });
            return Ok(response);
        }

        [HttpPost("get")]
        public IActionResult GetProductById([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var product = _productRepository.GetById(dto.Id);
                if (product == null) throw new Exception("Wrong product id!");
                return product;
            });
            return Ok(response);
        }

        [HttpPost("sellerproducts")]
        public IActionResult GetSellerProducts([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var products = _productRepository.GetBySellerId(dto.Id).ToList();
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

        [HttpPost("create")]
        public IActionResult CreateProduct([FromBody] CreateProductDto dto)
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

                return product;
            }, "Unauthorized");
            return Ok(response);
        }

        [HttpPost("update")]
        public IActionResult UpdateProduct([FromBody] EditProductDto dto)
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

                product.Name = dto.Name;
                product.Description = dto.Description;
                product.CategoryId = dto.CategoryId;
                product.Category = _productCategoryRepository.GetById(dto.CategoryId);
                product.PriceEuro = dto.PriceEuro;

                product = _productRepository.Update(product);

                return product;
            }, "Unauthorized");
            return Ok(response);
        }

        [HttpPost("delete")]
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

        [HttpGet("recommended")]
        public IActionResult GetRecommendedProducts()
        {
            throw new NotImplementedException();
        }
    }
}
