using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GetMalone.Data
{
    public class DeliveryType
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore] public List<DeliveryOption> DeliveryOptions { get; set; }
    }
}
