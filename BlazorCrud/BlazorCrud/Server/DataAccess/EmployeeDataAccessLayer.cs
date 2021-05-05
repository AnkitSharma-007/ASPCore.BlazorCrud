using BlazorCrud.Server.Interfaces;
using BlazorCrud.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace BlazorCrud.Server.DataAccess
{
    public class EmployeeDataAccessLayer : IEmployee
    {
        EmployeeDBContext _dbContext = new();

        public EmployeeDataAccessLayer(EmployeeDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        //To Get all employees details   
        public List<Employee> GetAllEmployees()
        {
            try
            {
                return _dbContext.Employees.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To Add new employee record     
        public void AddEmployee(Employee employee)
        {
            try
            {
                _dbContext.Employees.Add(employee);
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar employee    
        public void UpdateEmployee(Employee employee)
        {
            try
            {
                _dbContext.Entry(employee).State = EntityState.Modified;
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular employee    
        public Employee GetEmployeeData(int id)
        {
            try
            {
                Employee employee = _dbContext.Employees.Find(id);
                return employee;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular employee    
        public void DeleteEmployee(int id)
        {
            try
            {
                Employee emp = _dbContext.Employees.Find(id);
                _dbContext.Employees.Remove(emp);
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        // To get the list of Cities
        public List<City> GetCity()
        {
            try
            {
                return _dbContext.Cities.ToList();
            }
            catch
            {
                throw;
            }
        }
    }
}
