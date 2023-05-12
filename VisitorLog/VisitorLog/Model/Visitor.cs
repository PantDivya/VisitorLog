namespace VisitorLog.Model
{
    public class Visitor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Purpose { get; set; }
        public DateTime TimeIn { get; set; }
        public DateTime TimeOut { get; set; }
        public Manager AuthorizedBy { get; set; }
    }
}
