using AutoMapper;
using Dto.DtoModel;
using Dto.Services;
using PetsWebApi.Models;
using System.Collections.Generic;
using System.Web.Http;
using Dto.Services.ISirvec;

namespace PetsWebApi.Controllers
{
    public class OwnerController : ApiController
    {
        IOwnerService ownerService;

        public OwnerController()
        {
            ownerService = new OwnerService();
        }
        public IEnumerable<OwnerViewModelForList> Get()
        {

            var ownersDto = ownerService.GetAll();
            Mapper.Initialize(cfg => cfg.CreateMap<OwnerDto, OwnerViewModelForList>());
            var viewOwners = Mapper.Map<IEnumerable<OwnerDto>, List<OwnerViewModelForList>>(ownersDto);
            return viewOwners;
        }

        public OwnerViewModel Get(int id)
        {
            var ownerDto = ownerService.GetOwner(id);
            IEnumerable<PetViewModel> listPetViewModel = new List<PetViewModel>();
            var listPetsDto = ownerService.GetPets(id);

            Mapper.Initialize(cfg => cfg.CreateMap<OwnerDto, OwnerViewModel>());
            var viewOwner = Mapper.Map<OwnerDto, OwnerViewModel>(ownerDto);

            Mapper.Initialize(cfg => cfg.CreateMap<PetDto, PetViewModel>());
            viewOwner.Pets = Mapper.Map<IEnumerable<PetDto>, List<PetViewModel>>(listPetsDto);


            // OwnerViewModel viewOwner = new OwnerViewModel() {Id=ownerDto.Id, Name = ownerDto.Name };

            return viewOwner;
        }

        public void Post([FromBody]OwnerViewModel owner)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<OwnerViewModel, OwnerDto>());
            var ownersDto = Mapper.Map<OwnerViewModel, OwnerDto>(owner);
            ownerService.AddOwner(ownersDto);
        }

        public void Put(int id, [FromBody]string value)
        {
        }

        public void Delete(int id)
        {
            ownerService.DeleteOwner(id);
        }
    }
}
