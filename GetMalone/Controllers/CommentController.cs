using GetMalone.Data;
using GetMalone.Dtos;
using GetMalone.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace GetMalone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly JwtService _jwtService;

        public CommentController(IUserRepository userRepository, ICommentRepository commentRepository, JwtService jwtService)
        {
            _userRepository = userRepository;
            _commentRepository = commentRepository;
            _jwtService = jwtService;
        }

        [HttpPost("create")]
        public IActionResult CreateComment([FromBody] CreateCommentDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var userId = int.Parse(token.Issuer);
                var buyer = _userRepository.GetBuyerById(userId);
                if (buyer == null) throw new Exception();

                var comment = new Comment
                {
                    Body = dto.Body,
                    BuyerId = buyer.UserId,
                    ProductId = dto.ProductId
                };

                return _commentRepository.Create(comment);
            });
            return Ok(response);
        }

        [HttpPost("delete")]
        public IActionResult DeleteComment([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var userId = int.Parse(token.Issuer);
                var buyer = _userRepository.GetBuyerById(userId);
                if (buyer == null) throw new Exception();

                var comment = _commentRepository.GetById(dto.Id);
                if (comment.BuyerId != userId) throw new Exception();

                _commentRepository.Delete(comment);
            }, "Unauthorized");
            return Ok(response);
        }

        [HttpPost("product")]
        public IActionResult GetProductComments([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                return _commentRepository.GetByProductId(dto.Id).ToList();
            });
            return Ok(response);
        }

        [HttpPost("get")]
        public IActionResult GetCommentById([FromBody] IdDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                return _commentRepository.GetById(dto.Id);
            });
            return Ok(response);
        }
    }
}
