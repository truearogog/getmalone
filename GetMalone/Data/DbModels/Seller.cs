using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GetMalone.Data
{
    public class Seller
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public float Rating { get; set; } = 0;
        [Required]
        public List<string> SertificateCodes { get; set; }
    }
}
