using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GetMalone.Data
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Body { get; set; }
        [Range(0, 5)]
        public int Rating { get; set; }
        public int BuyerId { get; set; }
        [JsonIgnore] public Buyer Buyer { get; set; }
        public int SellerId { get; set; }
        [JsonIgnore] public Seller Seller { get; set; }
    }
}
