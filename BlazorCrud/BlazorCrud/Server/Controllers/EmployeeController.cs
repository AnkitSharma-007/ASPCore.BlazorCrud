using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlazorCrud.Server.Interfaces;
using BlazorCrud.Shared.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BlazorCrud.Server.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly IEmployee objemployee;

        public EmployeeController(IEmployee _objemployee)
        {
            objemployee = _objemployee;
        }

        [HttpGet]
        [Route("Index")]
        public IEnumerable<Employee> Index()
        {
            return objemployee.GetAllEmployees();
        }

        [HttpPost]
        [Route("Create")]
        public void Create([FromBody] Employee employee)
        {
            if (ModelState.IsValid)
                objemployee.AddEmployee(employee);
        }

        [HttpGet]
        [Route("Details/{id}")]
        public Employee Details(int id)
        {

            return objemployee.GetEmployeeData(id);
        }

        [HttpPut]
        [Route("Edit")]
        public void Edit([FromBody]Employee employee)
        {
            if (ModelState.IsValid)
                objemployee.UpdateEmployee(employee);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public void Delete(int id)
        {
            objemployee.DeleteEmployee(id);
        }
    }
}
