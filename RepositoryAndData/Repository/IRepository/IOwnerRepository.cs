using RepositoryAndData.DataContext;
using System.Collections.Generic;

namespace RepositoryAndData.Repository.IRepository
{
    public interface IOwnerRepository
    {
        IEnumerable<Owner> GetAll();
        Owner Get(int id);
        void Create(Owner owner);
        void Update(Owner owner);
        void Delete(int id);

    }
}
