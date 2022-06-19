using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GetMalone.Data
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [JsonIgnore]
        public string PasswordHash { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
    }
}
