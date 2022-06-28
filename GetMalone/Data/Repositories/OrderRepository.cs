using Microsoft.EntityFrameworkCore;

namespace GetMalone.Data
{
    public class OrderRepository : Repository, IOrderRepository
    {
        public OrderRepository(ApplicationDbContext context) : base(context) { }

        public Order? Create(Order order)
        {
            order = _context.Orders.Add(order).Entity;
            _context.SaveChanges();
            return order;
        }

        public Order? GetById(int orderId)
        {
            return _context.Orders
                .Include(o => o.DeliveryOption)
                .Include(o => o.DeliveryOption.DeliveryCompany)
                .Include(o => o.DeliveryOption.DeliveryType)
                .Include(o => o.Buyer)
                .Include(o => o.Products)
                .ThenInclude(p => p.Category)
                .Include(o => o.Products)
                .ThenInclude(p => p.Seller)
                .ThenInclude(s => s.User)
                .FirstOrDefault(o => o.Id.Equals(orderId));
        }

        public IQueryable<Order> GetByBuyerId(int buyerId)
        {
            return _context.Orders
                .Include(o => o.DeliveryOption)
                .Include(o => o.DeliveryOption.DeliveryCompany)
                .Include(o => o.DeliveryOption.DeliveryType)
                .Include(o => o.Products)
                .ThenInclude(p => p.Category)
                .Include(o => o.Products)
                .ThenInclude(p => p.Seller)
                .ThenInclude(s => s.User)
                .Where(o => o.BuyerId.Equals(buyerId));
        }

        public IQueryable<Order> GetBySellerId(int sellerId)
        {
            return _context.Orders
                .Include(o => o.DeliveryOption)
                .Include(o => o.DeliveryOption.DeliveryCompany)
                .Include(o => o.DeliveryOption.DeliveryType)
                .Include(o => o.Buyer)
                .ThenInclude(b => b.User)
                .Include(o => o.Products)
                .ThenInclude(p => p.Category)
                .Where(o => o.Products.Any(p => p.SellerId.Equals(sellerId)))
                .Select(o => new Order
                {
                    Id = o.Id,
                    Created = o.Created,
                    PriceEuro = o.PriceEuro,
                    BuyerId = o.BuyerId,
                    Buyer = o.Buyer,
                    DeliveryOptionId = o.DeliveryOptionId,
                    DeliveryOption = o.DeliveryOption,
                    Products = o.Products.Where(p => p.SellerId.Equals(sellerId)).ToHashSet()
                });
        }
    }
}
