using AutoMapper;
using Dto.DtoModel;
using RepositoryAndData.DataContext;
using RepositoryAndData.Repository;
using System.Collections.Generic;
using System.Linq;
using Dto.Services.ISirvec;

namespace Dto.Services
{
    public class OwnerService :IOwnerService
    {
        readonly UnitOfWork dataBase;
        
        public OwnerService()
        {
            dataBase = new UnitOfWork(new PetsContext());
        }
        public IEnumerable<OwnerDto> GetAll()
        {
            var owners = dataBase.OwnerRepository.GetAll();
            List<OwnerDto> ownerDtos = new List<OwnerDto>();

            foreach (var owner in owners)
            {
                ownerDtos.Add(OwnerToDtoMapper(owner));
            }
            return ownerDtos;
        }

        public void AddOwner(OwnerDto ownerDto)
        {
            Owner owner = new Owner()
            {
                Name = ownerDto.Name
            };
            dataBase.OwnerRepository.Create(owner);
            dataBase.Save();
        }

        public OwnerDto GetOwner(int id)
        {
            Owner owner = dataBase.OwnerRepository.Get(id);
            var ownerDto = OwnerToDtoMapper(owner);
            //if (owner.Pets.Count != 0)
            //    foreach (var pet in owner.Pets)
            //    {
            //        if (pet != null)
            //        {

            //            PetDto petDto = new PetDto();
            //            petDto.Name = pet.Name;
            //            petDto.Id = pet.Id;
            //            petDto.OwnerId = pet.OwnerId;
            //            ownerDto.Pets.Add(petDto);
            //        }

            //    }
            return ownerDto;
        }

        public IEnumerable<PetDto> GetPets(int id)
        {
            var listPet = dataBase.PetRepository.GetAll().Where(p => p.OwnerId == id);
            Mapper.Initialize(config => config.CreateMap<Pet, PetDto>());
            var listPetDto = Mapper.Map<IEnumerable<Pet>, List<PetDto>>(listPet);

            return listPetDto;
        }

        public void DeleteOwner(int id)
        {
            dataBase.OwnerRepository.Delete(id);
            dataBase.Save();
        }

        public void AddPet(PetDto petDto)
        {
          Mapper.Initialize(config => config.CreateMap<PetDto, Pet>());
            var pet = Mapper.Map<PetDto, Pet>(petDto);
            dataBase.PetRepository.Create(pet);
            dataBase.Save();
        }

        public void DeletePet(int id)
        {
            dataBase.PetRepository.Delete(id);
            dataBase.Save();
        }

        private OwnerDto OwnerToDtoMapper(Owner owner)
        {
            OwnerDto ownerDto = new OwnerDto();
            ownerDto.Id = owner.Id;
            ownerDto.Name = owner.Name;
            ownerDto.PetsCount = owner.Pets.Count;
            return ownerDto;
        }

       
    }
}
