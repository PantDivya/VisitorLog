using Microsoft.AspNetCore.Mvc;
using VisitorLog.DAL;
using VisitorLog.DTO;
using VisitorLog.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VisitorLog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly VisitorLogDbContext _db;
        public ManagerController(VisitorLogDbContext db)
        {
            _db = db;
        }

        // GET: api/<ManagerController>
        [HttpGet]
        public IActionResult GetManager()
        {
            var managerList = _db.Managers.Where(a => a.IsActive == true).ToList();
            return Ok(managerList);
        }

        // GET api/<ManagerController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var manager = _db.Managers.Where(x => x.Id == id).FirstOrDefault();
            return Ok(manager);
        }

        // POST api/<ManagerController>
        [HttpPost]
        public void Post([FromBody] ManagerDTO managerDTO)
        {
            Manager newManager= new Manager();
            newManager.Name = managerDTO.Name;
            newManager.Department = managerDTO.Department;
            newManager.Contact = managerDTO.Contact;
            newManager.IsActive = true;

            _db.Add(newManager);
            _db.SaveChanges();
            
        }

        // PUT api/<ManagerController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Manager manager)
        {
            var editManager = _db.Managers.Where(a=>a.Id== id).FirstOrDefault();

            editManager.Name= manager.Name;
            editManager.Department = manager.Department;
            editManager.Contact = manager.Contact;
           // editManager.IsActive = manager.IsActive;

            _db.SaveChanges();
            return Ok(editManager);
        }

        // DELETE api/<ManagerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var manager = _db.Managers.Where(a=>a.Id== id).FirstOrDefault();
            manager.IsActive = false;
            _db.SaveChanges();
        }
    }
}
