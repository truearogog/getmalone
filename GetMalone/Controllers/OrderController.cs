using GetMalone.Data;
using GetMalone.Dtos;
using GetMalone.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace GetMalone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IDeliveryRepository _deliveryRepository;
        private readonly JwtService _jwtService;

        public OrderController(
            IUserRepository userRepository,
            IProductRepository productRepository,
            IOrderRepository orderRepository,
            IDeliveryRepository deliveryRepository,
            JwtService jwtService)
        {
            _userRepository = userRepository;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
            _deliveryRepository = deliveryRepository;
            _jwtService = jwtService;
        }

        [HttpPost("create")]
        public IActionResult CreateOrder([FromBody] CreateOrderDto dto)
        {
            var response = new ApiResponseDto(() =>
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var userId = int.Parse(token.Issuer);
                var buyer = _userRepository.GetBuyerById(userId);
                if (buyer == null) throw new Exception();

                var deliveryOption = _deliveryRepository.GetOptionById(dto.DeliveryOptionId);
                if (deliveryOption == null) throw new Exception();

                var order = new Order
                {
                    BuyerId = userId,
                    Buyer = buyer,
                    DeliveryOptionId = dto.DeliveryOptionId,
                    DeliveryOption = deliveryOption,
                    Products = dto.Ids.Select(id => _productRepository.GetById(id)).ToHashSet()
                };
                order.PriceEuro = order.Products.Sum(p => p.PriceEuro) + deliveryOption.PriceEuro;

                return _orderRepository.Create(order);
            }, "Unauthorized");
            return Ok(response);
        }

        [HttpPost("buyer")]
        public IActionResult GetOrdersByBuyerId()
        {
            var response = new ApiResponseDto(() =>
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var userId = int.Parse(token.Issuer);

                var buyer = _userRepository.GetBuyerById(userId);
                if (buyer == null) throw new Exception();

                return _orderRepository.GetByBuyerId(userId).ToList();
            }, "Unauthorized");
            return Ok(response);
        }

        [HttpPost("seller")]
        public IActionResult GetOrdersBySellerId()
        {
            var response = new ApiResponseDto(() =>
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var userId = int.Parse(token.Issuer);

                var seller = _userRepository.GetSellerById(userId);
                if (seller == null) throw new Exception();

                return _orderRepository.GetBySellerId(userId).ToList();
            }, "Unauthorized");
            return Ok(response);
        }
    }
}
