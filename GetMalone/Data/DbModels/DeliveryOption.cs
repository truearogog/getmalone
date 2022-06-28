using System.ComponentModel.DataAnnotations;

namespace GetMalone.Data
{
    public class DeliveryOption
    {
        [Key]
        public int Id { get; set; }
        public decimal PriceEuro { get; set; }
        public int DeliveryTypeId { get; set; }
        public DeliveryType DeliveryType { get; set; }
        public int DeliveryCompanyId { get; set; }
        public DeliveryCompany DeliveryCompany { get; set; }
    }
}
