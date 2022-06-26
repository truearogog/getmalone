namespace GetMalone.Data
{
    public interface IReviewRepository
    {
        Review? Create(Review review);
        Review? GetById(int reviewId);
        IQueryable<Review> GetBySellerId(int sellerId);
        IQueryable<Review> GetByBuyerId(int buyerId);
        void Delete(Review review);
    }
}
