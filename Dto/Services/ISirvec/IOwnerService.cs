using Dto.DtoModel;
using System.Collections.Generic;

namespace Dto.Services.ISirvec
{
   public interface IOwnerService
    {
        IEnumerable<OwnerDto> GetAll();

        void AddOwner(OwnerDto ownerDto);


        OwnerDto GetOwner(int id);


        IEnumerable<PetDto> GetPets(int id);


        void DeleteOwner(int id);


        void AddPet(PetDto petDto);


        void DeletePet(int id);

    }
}
