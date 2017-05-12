using RepositoryAndData.DataContext;
using System.Collections.Generic;

namespace RepositoryAndData.Repository.IRepository
{
    public  interface IPetRepository
    {
        IEnumerable<Pet> GetAll();
        Pet Get(int id);
        void Create(Pet pet);
        void Update(Pet pet);
        void Delete(int id);
    }
}
