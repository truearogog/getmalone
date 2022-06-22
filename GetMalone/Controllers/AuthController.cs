using GetMalone.Data;
using GetMalone.Dtos;
using GetMalone.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace GetMalone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IBuyerRepository _buyerRepository;
        private readonly ISellerRepository _sellerRepository;
        private readonly JwtService _jwtService;

        public AuthController(
            IUserRepository userRepository, 
            IBuyerRepository buyerRepository, 
            ISellerRepository sellerRepository, 
            JwtService jwtService)
        {
            _userRepository = userRepository;
            _buyerRepository = buyerRepository;
            _sellerRepository = sellerRepository;
            _jwtService = jwtService;
        }

        private static object? BuyerUser(User user, Buyer buyer)
        {
            return new {
                user = "buyer",
                user.Id, user.Created, user.Email, user.Phone, user.Name, user.Surname,
                buyer.MailIndex, buyer.Interests
            };
        }

        private static object? SellerUser(User user, Seller seller)
        {
            return new
            {
                user = "seller",
                user.Id, user.Created, user.Email, user.Phone, user.Name, user.Surname,
                seller.Rating, seller.SertificateCodes
            };
        }

        private User Register(RegisterDto dto)
        {
            var user = _userRepository.Create(new User
            {
                Created = DateTime.Now,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Phone = dto.Phone,
                Name = dto.Name,
                Surname = dto.Surname
            });
            return user;
        }

        [HttpPost("register/buyer")]
        public IActionResult RegisterBuyer([FromBody] BuyerRegisterDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var user = Register(dto);

                var buyer = _buyerRepository.Create(new Buyer
                {
                    UserId = user.Id,
                    User = user,
                    MailIndex = dto.MailIndex,
                    Interests = dto.Interests
                });

                return BuyerUser(user, buyer);
            }, "This email is already used");
            return Ok(response);
        }

        [HttpPost("register/seller")]
        public IActionResult RegisterSeller([FromBody] SellerRegisterDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var user = Register(dto);

                var seller = _sellerRepository.Create(new Seller {
                    UserId = user.Id,
                    User = user,
                    SertificateCodes = dto.SertificateCodes
                });

                return SellerUser(user, seller);
            }, "This email is already used");
            return Ok(response);
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var user = _userRepository.GetByEmail(dto.Email);

                if (user == null)
                    throw new Exception();

                if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                    throw new Exception();

                var jwt = _jwtService.Generate(user.Id);

                Response.Cookies.Append("jwt", jwt, new CookieOptions { HttpOnly = true });
            }, "Invalid Credentials");
            return Ok(response);
        }

        [HttpGet("user")]
        public new IActionResult User()
        {
            var response = new ApiResponseDto(() =>
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var userId = int.Parse(token.Issuer);
                var user = _userRepository.GetById(userId);

                var buyer = _buyerRepository.GetById(userId);
                if (buyer != null) return BuyerUser(user, buyer);

                var seller = _sellerRepository.GetById(userId);
                if (seller != null) return SellerUser(user, seller);

                return user;
            }, "Unauthorized");
            return Ok(response);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var response = new ApiResponseDto(() =>
            {
                Response.Cookies.Delete("jwt");
            });
            return Ok(response);
        }
    }
}
