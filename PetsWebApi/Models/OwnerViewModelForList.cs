using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PetsWebApi.Models
{
    public class OwnerViewModelForList
    {

            public long Id { get; set; }

            public string Name { get; set; }

            public int PetsCount { get; set; }

    }
}