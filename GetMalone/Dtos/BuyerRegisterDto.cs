namespace GetMalone.Dtos
{
    public class BuyerRegisterDto : RegisterDto
    {
        public string MailIndex { get; set; }
        public List<string> Interests { get; set; }
    }
}
