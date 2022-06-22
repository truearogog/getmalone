namespace GetMalone.Data
{
    public interface IProductRepository
    {
        Product? Create(Product product);
        void Delete(Product product);
        IQueryable<Product> GetAll();
        IQueryable<Product> GetByCategoryId(int categoryId);
        Product? GetById(int productId);
        IQueryable<Product> GetBySellerId(int sellerId);
    }
}
