using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GetMalone.Data
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime Created { get; set; }

        [Required]
        public int SellerId { get; set; }
        [ForeignKey("SellerId")]
        [JsonIgnore]
        public Seller Seller { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        [JsonIgnore]
        public ProductCategory Category { get; set; }

        public decimal PriceEuro { get; set; }
    }
}
