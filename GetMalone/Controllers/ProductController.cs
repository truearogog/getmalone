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
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _productCategoryRepository;
        private readonly JwtService _jwtService;

        public ProductController(IUserRepository userRepository, IProductRepository productRepository, ICategoryRepository productCategoryRepository, JwtService jwtService)
        {
            _userRepository = userRepository;
            _productRepository = productRepository;
            _productCategoryRepository = productCategoryRepository;
            _jwtService = jwtService;
        }

        private void ValidateCreateProductDto(CreateProductDto dto)
        {
            var category = _productCategoryRepository.GetById(dto.CategoryId);
            if (category == null) throw new Exception("Wrong category Id");
            if (string.IsNullOrEmpty(dto.Name))
                throw new Exception("Name cannot be empty");
            if (dto.PriceEuro.Equals(decimal.Zero))
                throw new Exception("Price cannot be zero");
        }

        private void ValidateEditProductDto(EditProductDto dto)
        {
            var product = _productRepository.GetById(dto.Id);
            if (product == null) throw new Exception("Wrong product Id");
            var category = _productCategoryRepository.GetById(dto.CategoryId);
            if (category == null) throw new Exception("Wrong category Id");
            if (string.IsNullOrEmpty(dto.Name))
                throw new Exception("Name cannot be empty");
            if (dto.PriceEuro.Equals(decimal.Zero))
                throw new Exception("Price cannot be zero");
        }

        [HttpGet("all")]
        public IActionResult GetAllProducts()
        {
            var response = new ApiResponseDto(() =>
            {
                var products = _productRepository.GetAll().ToArray();
                Array.Sort(products, Product.CompareByName);
                return products.ToList();
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
                var seller = _userRepository.GetSellerById(userId);
                if (seller == null) throw new Exception("Unauthorized");

                ValidateCreateProductDto(dto);

                var category = _productCategoryRepository.GetById(dto.CategoryId);

                var product = new Product
                {
                    Seller = seller,
                    Name = dto.Name,
                    Description = dto.Description,
                    CategoryId = dto.CategoryId,
                    PriceEuro = dto.PriceEuro,
                    ImageUrl = string.IsNullOrEmpty(dto.ImageUrl) ? category.ImageUrl : dto.ImageUrl
                };

                return _productRepository.Create(product);
            });
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
                var seller = _userRepository.GetSellerById(userId);
                if (seller == null) throw new Exception("Unauthorized");

                ValidateEditProductDto(dto);

                var product = _productRepository.GetById(dto.Id);
                if (product == null) throw new Exception("Wrong product Id");

                var category = _productCategoryRepository.GetById(dto.CategoryId);
                if (category == null) throw new Exception("Wrong category Id");

                product.Name = dto.Name;
                product.Description = dto.Description;
                product.CategoryId = dto.CategoryId;
                product.PriceEuro = dto.PriceEuro;
                product.ImageUrl = string.IsNullOrEmpty(dto.ImageUrl) ? category.ImageUrl : dto.ImageUrl;

                product = _productRepository.Update(product);

                return product;
            });
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
                var seller = _userRepository.GetSellerById(userId);
                if (seller == null) throw new Exception();

                var product = _productRepository.GetById(dto.Id);
                if (product == null || product.SellerId != userId) throw new Exception();

                _productRepository.Delete(product);
            }, "Unauthorized");
            return Ok(response);
        }

        [HttpPost("category")]
        public IActionResult GetCategoryProducts([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var products = _productRepository.GetByCategoryId(dto.Id).ToArray();
                Array.Sort(products, Product.CompareByName);
                return products.ToList();
            });
            return Ok(response);
        }

        [HttpPost("get")]
        public IActionResult GetProductById([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                return _productRepository.GetById(dto.Id);
            });
            return Ok(response);
        }

        [HttpPost("seller")]
        public IActionResult GetSellerProducts([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                return _productRepository.GetBySellerId(dto.Id).ToList();
            });
            return Ok(response);
        }

        [HttpGet("allcategories")]
        public IActionResult GetAllCategories()
        {
            var response = new ApiResponseDto(() =>
            {
                return _productCategoryRepository.GetAll();
            });
            return Ok(response);
        }

        [HttpGet("recommended")]
        public IActionResult GetRecommendedProducts()
        {
            throw new NotImplementedException();
        }
    }
}
