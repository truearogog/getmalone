using GetMalone.Data;

namespace GetMalone.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _userContext;

        public UserRepository(UserContext userContext)
        {
            _userContext = userContext;
        }

        public User Create(User user)
        {
            _userContext.Users.Add(user);
            user.Id = _userContext.SaveChanges();
            return user;
        }

        public User GetById(int id)
        {
            return _userContext.Users.FirstOrDefault(u => u.Id.Equals(id));
        }

        public User GetByEmail(string email)
        {
            return _userContext.Users.FirstOrDefault(u => u.Email.Equals(email));
        }
    }
}
