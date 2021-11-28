using System.ComponentModel.DataAnnotations;

namespace BlazorCrud.Server.Models
{
    public partial class Employee
    {
        public int EmployeeId { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string City { get; set; } = null!;

        [Required]
        public string Department { get; set; } = null!;

        [Required]
        public string Gender { get; set; } = null!;
    }
}
