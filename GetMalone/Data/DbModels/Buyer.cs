using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GetMalone.Data
{
    public class Buyer
    {
        [Key]
        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [Required]
        public string MailIndex { get; set; }
        [Required]
        public List<string> Interests { get; set; }
    }
}
