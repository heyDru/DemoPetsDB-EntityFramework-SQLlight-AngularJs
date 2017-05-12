using System.Collections.Generic;

namespace PetsWebApi.Models
{
    public class OwnerViewModel
    {
        public OwnerViewModel()
        {
            Pets = new List<PetViewModel>();
        }
        public long Id { get; set; }

        public string Name { get; set; }

        public int PetsCount { get; set; }
         public List<PetViewModel> Pets { get; set; }
    }
}