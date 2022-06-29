using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GetMalone.Data
{
    public class Product
    {
        public Product()
        {
            Orders = new HashSet<Order>();
        }

        [Key]
        public int Id { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;

        public int SellerId { get; set; }
        public Seller Seller { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public decimal PriceEuro { get; set; }
        public string ImageUrl { get; set; }

        [JsonIgnore] public List<Comment> Comments { get; set; }
        [JsonIgnore] public virtual ICollection<Order> Orders { get; set; }

        public static int CompareByName(Product p1, Product p2)
        {
            return string.Compare(p1.Name, p2.Name);
        }
    }
}
