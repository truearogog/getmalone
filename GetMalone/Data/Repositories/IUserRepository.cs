namespace GetMalone.Data
{
    public interface IUserRepository
    {
        User? Create(User user);
        User? GetById(int id);
        User? GetByEmail(string email);
    }
}
