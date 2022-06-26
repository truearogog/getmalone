using GetMalone.Data;
using GetMalone.Dtos;
using GetMalone.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace GetMalone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IReviewRepository _reviewRepository;
        private readonly JwtService _jwtService;

        public ReviewController(IUserRepository userRepository, IReviewRepository reviewRepository, JwtService jwtService)
        {
            _userRepository = userRepository;
            _reviewRepository = reviewRepository;
            _jwtService = jwtService;
        }

        [HttpPost("create")]
        public IActionResult CreateReview([FromBody] CreateReviewDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var userId = int.Parse(token.Issuer);
                var buyer = _userRepository.GetBuyerById(userId);
                if (buyer == null) throw new Exception();

                var review = new Review
                {
                    Body = dto.Body,
                    Rating = dto.Rating,
                    BuyerId = buyer.UserId,
                    SellerId = dto.SellerId
                };

                return _reviewRepository.Create(review);
            });
            return Ok(response);
        }

        [HttpPost("delete")]
        public IActionResult DeleteReview([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var userId = int.Parse(token.Issuer);
                var buyer = _userRepository.GetBuyerById(userId);
                if (buyer == null) throw new Exception();

                var review = _reviewRepository.GetById(dto.Id);
                if (review.BuyerId != userId) throw new Exception();

                _reviewRepository.Delete(review);
            }, "Unauthorized");
            return Ok(response);
        }

        [HttpPost("buyer")]
        public IActionResult GetBuyerReviews([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                return _reviewRepository.GetByBuyerId(dto.Id).ToList();
            });
            return Ok(response);
        }

        [HttpPost("seller")]
        public IActionResult GetSellerReviews([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                return _reviewRepository.GetBySellerId(dto.Id).ToList();
            });
            return Ok(response);
        }
    }
}
