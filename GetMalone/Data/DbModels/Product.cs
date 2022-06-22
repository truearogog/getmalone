using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


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
        public Seller Seller { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public ProductCategory Category { get; set; }

        public decimal PriceEuro { get; set; }
    }
}
