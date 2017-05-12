using Dto.DtoModel;
using Dto.Services;
using PetsWebApi.Models;
using System.Web.Http;
using Dto.Services.ISirvec;

namespace PetsWebApi.Controllers
{
    public class PetController : ApiController
    {
        IOwnerService ownerService;

        public PetController()
        {
            ownerService = new OwnerService();
        }
      
        
        public void Post([FromBody]PetViewModel pet)
        {
            PetDto petDto = new PetDto() {Name = pet.Name, OwnerId = pet.OwnerId} ;
            ownerService.AddPet(petDto);
        }
        public void Delete(int id)
        {
            ownerService.DeletePet(id);
        }
    }
}
