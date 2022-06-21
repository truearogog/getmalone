using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GetMalone.Data
{
    public class Seller
    {
        [Key]
        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [Required]
        public float Rating { get; set; } = 0;
        [Required]
        public List<string> SertificateCodes { get; set; }

        public List<Product> Products { get; set; }
    }
}
