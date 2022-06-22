namespace GetMalone.Data
{
    public class UserRepository : Repository, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context) {}

        public User? Create(User user)
        {
            user = _context.Users.Add(user).Entity;
            _context.SaveChanges();
            return user;
        }

        public User? GetById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id.Equals(id));
        }

        public User? GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email.Equals(email));
        }
    }
}
