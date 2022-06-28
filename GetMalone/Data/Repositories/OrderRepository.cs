﻿using Microsoft.EntityFrameworkCore;

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
                .Include(o => o.Buyer)
                .Include(o => o.Products)
                .FirstOrDefault(o => o.Id.Equals(orderId));
        }

        public IQueryable<Order> GetByBuyerId(int buyerId)
        {
            return _context.Orders
                .Include(o => o.Products)
                .Where(o => o.BuyerId.Equals(buyerId));
        }

        public IQueryable<Order> GetBySellerId(int sellerId)
        {
            return _context.Orders
                .Include(o => o.Buyer)
                .Include(o => o.Products)
                .Where(o => o.Products.Any(p => p.SellerId.Equals(sellerId)))
                .Select(o => new Order
                {
                    Id = o.Id,
                    Created = o.Created,
                    PriceEuro = o.PriceEuro,
                    BuyerId = o.BuyerId,
                    Buyer = o.Buyer,
                    Products = o.Products.Where(p => p.SellerId.Equals(sellerId)).ToHashSet()
                });
        }
    }
}