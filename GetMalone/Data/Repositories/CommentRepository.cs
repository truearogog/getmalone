using Microsoft.EntityFrameworkCore;

namespace GetMalone.Data
{
    public class CommentRepository : Repository, ICommentRepository
    {
        public CommentRepository(ApplicationDbContext context) : base(context) {}

        public Comment? Create(Comment comment)
        {
            comment = _context.Comments.Add(comment).Entity;
            _context.SaveChanges();
            return comment;
        }

        public Comment? GetById(int commentId)
        {
            return _context.Comments
                .Include(c => c.Buyer)
                .Where(c => c.Id.Equals(commentId))
                .FirstOrDefault();
        }

        public IQueryable<Comment> GetByProductId(int productId)
        {
            return _context.Comments
                .Include(c => c.Buyer)
                .Where(c => c.ProductId.Equals(productId));
        }

        public void Delete(Comment comment)
        {
            _context.Comments.Remove(comment);
            _context.SaveChanges();
        }
    }
}
