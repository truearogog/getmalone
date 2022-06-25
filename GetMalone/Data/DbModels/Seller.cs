using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public List<Product> Products { get; set; }
    }
}
