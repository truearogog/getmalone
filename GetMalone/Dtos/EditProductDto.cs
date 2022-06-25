namespace GetMalone.Dtos
{
    public class EditProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public decimal PriceEuro { get; set; }
    }
}
