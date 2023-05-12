using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VisitorLog.DAL;
using VisitorLog.DTO;
using VisitorLog.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VisitorLog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly VisitorLogDbContext _db;
        public EmployeeController(VisitorLogDbContext db)
        {
            this._db = db;
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public IActionResult Get()
        {
            var employeeList = _db.Employees.Where(a => a.IsActive == true).Include(x => x.Department).ToList();
            return Ok(employeeList);
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var employee = _db.Employees.Include(x => x.Department).Where(x => x.Id == id).FirstOrDefault();
            return Ok(employee);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public void Post([FromBody] EmployeeDTO employeeDTO)
        {
            var Department = _db.Managers.Where(x=>x.Id == employeeDTO.ManagerId).FirstOrDefault(); ;
            Employee newEmployee= new Employee();
            newEmployee.Name = employeeDTO.Name;
            newEmployee.Contact = employeeDTO.Contact;
            newEmployee.Position = employeeDTO.Position;
            newEmployee.Department = Department;
            newEmployee.IsActive = true;

            _db.Employees.Add(newEmployee);
            _db.SaveChanges();
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] EmployeeDTO employeeDTO)
        {
            var editEmployee = _db.Employees.Where(a => a.Id == id).FirstOrDefault();
            var Department = _db.Managers.Where(x => x.Id == employeeDTO.ManagerId).FirstOrDefault();

            editEmployee.Name = employeeDTO.Name;
            editEmployee.Contact = employeeDTO.Contact;
            editEmployee.Position = employeeDTO.Position;
            editEmployee.Department = Department;
            editEmployee.IsActive = employeeDTO.IsActive;

            _db.SaveChanges();
            return Ok(editEmployee);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var deleteemployee = _db.Employees.Where(a => a.Id == id).FirstOrDefault();
            deleteemployee.IsActive = false;
            _db.SaveChanges();
        }
    }
}
