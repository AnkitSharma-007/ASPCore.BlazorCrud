using BlazorCrud.Server.Models;
using System.Collections.Generic;

namespace BlazorCrud.Server.Interfaces
{
    public interface IEmployee
    {
        public List<Employee> GetAllEmployees();

        public void AddEmployee(Employee employee);

        public void UpdateEmployee(Employee employee);

        public Employee GetEmployeeData(int id);

        public void DeleteEmployee(int id);

        public List<City> GetCity();
    }
}
