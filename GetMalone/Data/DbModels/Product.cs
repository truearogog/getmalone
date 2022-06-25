using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GetMalone.Data
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;

        public int SellerId { get; set; }
        public Seller Seller { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public int CategoryId { get; set; }
        public ProductCategory Category { get; set; }

        public decimal PriceEuro { get; set; }
    }
}
