using System;
using System.Collections.Generic;

namespace BlazorCrud.Server.Models
{
    public partial class City
    {
        public int CityId { get; set; }
        public string CityName { get; set; } = null!;
    }
}
