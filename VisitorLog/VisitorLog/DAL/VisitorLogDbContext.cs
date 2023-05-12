using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using VisitorLog.Model;

namespace VisitorLog.DAL
{
    public class VisitorLogDbContext:DbContext
    {
        public VisitorLogDbContext(DbContextOptions<VisitorLogDbContext> options) : base(options)
        {
        }

        public DbSet<Manager> Managers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Visitor> Visitors { get; set; }
    }
}

