namespace GetMalone.Data
{
    public class ReviewRepository : Repository, IReviewRepository
    {
        public ReviewRepository(ApplicationDbContext context) : base(context) { }

        public Review? Create(Review review)
        {
            review = _context.Reviews.Add(review).Entity;
            _context.SaveChanges();
            return review;
        }

        public Review? GetById(int reviewId)
        {
            return _context.Reviews.FirstOrDefault(r => r.Id.Equals(reviewId));
        }

        public IQueryable<Review> GetByBuyerId(int buyerId)
        {
            return _context.Reviews.Where(r => r.BuyerId.Equals(buyerId));
        }

        public IQueryable<Review> GetBySellerId(int sellerId)
        {
            return _context.Reviews.Where(r => r.SellerId.Equals(sellerId));
        }

        public void Delete(Review review)
        {
            _context.Reviews.Remove(review);
            _context.SaveChanges();
        }
    }
}
