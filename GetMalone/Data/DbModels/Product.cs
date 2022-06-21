using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace GetMalone.Data
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int SellerId { get; set; }
        [ForeignKey("SellerId")]
        public Seller Seller { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
