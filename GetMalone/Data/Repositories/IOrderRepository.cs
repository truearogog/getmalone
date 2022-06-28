namespace GetMalone.Data
{
    public interface IOrderRepository
    {
        Order? Create(Order order);
        Order? GetById(int orderId);
        IQueryable<Order> GetByBuyerId(int buyerId);
        IQueryable<Order> GetBySellerId(int sellerId);
    }
}
