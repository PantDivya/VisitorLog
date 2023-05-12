namespace VisitorLog.Model
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Position { get; set; }
        public Manager Department { get; set; }
        public bool IsActive { get; set; }
    }
}
