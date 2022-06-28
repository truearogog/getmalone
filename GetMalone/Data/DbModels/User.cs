using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GetMalone.Data
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Email { get; set; }
        [JsonIgnore] public string PasswordHash { get; set; }
        public string Phone { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string ImageUrl { get; set; }
        [JsonIgnore] public Seller Seller { get; set; }
        [JsonIgnore] public Buyer Buyer { get; set; }
    }

    public class Seller
    {
        [Key]
        public int UserId { get; set; }
        public User User { get; set; }
        [Range(0f, 5f)]
        public float Rating { get; set; } = 0f;
        public List<string> SertificateCodes { get; set; }

        [JsonIgnore] public List<Product> Products { get; set; }
        [JsonIgnore] public List<Review> Reviews { get; set; }
    }

    public class Buyer
    {
        [Key]
        public int UserId { get; set; }
        public User User { get; set; }
        public string MailIndex { get; set; }
        public List<string> Interests { get; set; }

        [JsonIgnore] public List<Comment> Comments { get; set; }
        [JsonIgnore] public List<Review> Reviews { get; set; }
        [JsonIgnore] public List<Order> Orders { get; set; }
    }
}
