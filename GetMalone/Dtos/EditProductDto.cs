namespace GetMalone.Dtos
{
    public class EditProductDto : IdDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public decimal PriceEuro { get; set; }
    }
}
