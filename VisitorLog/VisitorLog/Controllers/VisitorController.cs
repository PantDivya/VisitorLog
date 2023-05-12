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
    public class VisitorController : ControllerBase
    {
        private readonly VisitorLogDbContext _db;
        public VisitorController(VisitorLogDbContext db)
        {
            this._db = db;
        }
        // GET: api/<VisitorController>
        [HttpGet]
        public IActionResult Get()
        {
            var visitorList = _db.Visitors.Include(x => x.AuthorizedBy).ToList();
            return Ok(visitorList);
        }

        // GET api/<VisitorController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var visitor = _db.Visitors.Include(x => x.AuthorizedBy).Where(x => x.Id == id).FirstOrDefault();
            return Ok(visitor);
        }

        // POST api/<VisitorController>
        [HttpPost]
        public void Post([FromBody] VisitorDTO visitorDTO)
        {
            var Authorize = _db.Managers.Where(x => x.Id == visitorDTO.ManagerId).FirstOrDefault();
            Visitor newVisitor = new Visitor();
            newVisitor.Name = visitorDTO.Name;
            newVisitor.Purpose = visitorDTO.Purpose;
            newVisitor.TimeIn = visitorDTO.TimeIn;
            newVisitor.TimeOut = visitorDTO.TimeOut;
            newVisitor.AuthorizedBy = Authorize;

            _db.Visitors.Add(newVisitor);
            _db.SaveChanges();
        }

        // PUT api/<VisitorController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] VisitorDTO visitorDTO)
        {
            var edit = _db.Visitors.Where(a => a.Id == id).FirstOrDefault();
            var Authorize = _db.Managers.Where(x => x.Id == visitorDTO.ManagerId).FirstOrDefault();

            edit.Name = visitorDTO.Name;
            edit.Purpose = visitorDTO.Purpose;
            edit.TimeIn = visitorDTO.TimeIn;
            edit.TimeOut = visitorDTO.TimeOut;
            edit.AuthorizedBy = Authorize;
        }

        // DELETE api/<VisitorController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
