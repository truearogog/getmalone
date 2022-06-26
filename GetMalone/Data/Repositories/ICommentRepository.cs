namespace GetMalone.Data
{
    public interface ICommentRepository
    {
        Comment? Create(Comment comment);
        Comment? GetById(int commentId);
        IQueryable<Comment> GetByProductId(int productId);
        void Delete(Comment comment);
    }
}
