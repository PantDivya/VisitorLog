using VisitorLog.Model;

namespace VisitorLog.DTO
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Position { get; set; }
        public int ManagerId { get; set; }
        public bool IsActive { get; set; }
    }
}
