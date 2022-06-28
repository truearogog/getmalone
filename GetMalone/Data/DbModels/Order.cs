using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GetMalone.Data
{
    public class Order
    {
        public Order()
        {
            Products = new HashSet<Product>();
        }
        [Key]
        public int Id { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public decimal PriceEuro { get; set; }
        public int BuyerId { get; set; }
        public Buyer Buyer { get; set; }
        public int DeliveryOptionId { get; set; }
        public DeliveryOption DeliveryOption { get; set;}
        public virtual ICollection<Product> Products { get; set; }
    }
}
