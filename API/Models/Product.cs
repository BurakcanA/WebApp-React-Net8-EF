namespace API.Models
{
    public class Product
    {
        public int Id { get; set;}
        public required string Name { get; set;}
        public string? Descrption { get; set;}
        public double Price { get; set; }
        public bool InStore { get; set; }
    }
}