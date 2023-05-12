using VisitorLog.Model;

namespace VisitorLog.DTO
{
    public class VisitorDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Purpose { get; set; }
        public DateTime TimeIn { get; set; }
        public DateTime TimeOut { get; set; }
        public int ManagerId { get; set; }
    }
}
