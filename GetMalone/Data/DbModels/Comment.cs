using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GetMalone.Data
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Body { get; set; }
        public int BuyerId { get; set; }
        [JsonIgnore] public Buyer Buyer { get; set; }
        public int ProductId { get; set; }
        [JsonIgnore] public Product Product { get; set; }
    }
}
