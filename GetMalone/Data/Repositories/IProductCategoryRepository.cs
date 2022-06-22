namespace GetMalone.Data
{
    public interface IProductCategoryRepository
    {
        IQueryable<ProductCategory> GetAll();
        ProductCategory? GetById(int categoryId);
    }
}
