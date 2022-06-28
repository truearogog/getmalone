namespace GetMalone.Dtos
{
    public class CreateOrderDto
    {
        public List<int> ProductIds { get; set; }
        public int DeliveryOptionId { get; set; }
    }
}
