using GetMalone.Data;
using GetMalone.Dtos;
using GetMalone.Helpers;
using GetMalone.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace GetMalone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Config _config;
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;

        public AuthController(Config config, IUserRepository userRepository, JwtService jwtService)
        {
            _config = config;
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        private User NewUser(RegisterDto dto)
        {
            if (_userRepository.GetByEmail(dto.Email) != null)
                throw new Exception("This email is already used");
            if (!RegexUtilities.IsValidEmail(dto.Email))
                throw new Exception("Email is not valid");
            if (string.IsNullOrEmpty(dto.Password))
                throw new Exception("Password does not match requirements");
            if (string.IsNullOrEmpty(dto.Name))
                throw new Exception("Name cannot be empty");
            if (string.IsNullOrEmpty(dto.Surname))
                throw new Exception("Surname cannot be empty");
            return new User
            {
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Phone = dto.Phone,
                Name = dto.Name,
                Surname = dto.Surname,
                ImageUrl = string.IsNullOrEmpty(dto.ImageUrl) ? _config.DefaultUserImageUrl : dto.ImageUrl
            };
        }

        private Buyer NewBuyer(BuyerRegisterDto dto)
        {
            return new Buyer
            {
                MailIndex = dto.MailIndex,
                Interests = dto.Interests
            };
        }

        private Seller NewSeller(SellerRegisterDto dto)
        {
            return new Seller
            {
                SertificateCodes = dto.SertificateCodes
            };
        }

        [HttpPost("register/buyer")]
        public IActionResult RegisterBuyer([FromBody] BuyerRegisterDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var user = NewUser(dto);
                var buyer = NewBuyer(dto);
                return _userRepository.CreateBuyer(user, buyer);
            });
            return Ok(response);
        }

        [HttpPost("register/seller")]
        public IActionResult RegisterSeller([FromBody] SellerRegisterDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var user = NewUser(dto);
                var seller = NewSeller(dto);
                return _userRepository.CreateSeller(user, seller);
            });
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

                var buyer = _userRepository.GetBuyerById(userId);
                if (buyer != null) return new { role = "buyer", info = buyer };

                var seller = _userRepository.GetSellerById(userId);
                if (seller != null) return new { role = "seller", info = seller };

                throw new Exception();
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
