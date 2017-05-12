using RepositoryAndData.DataContext;
using RepositoryAndData.Repository.IRepository;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace RepositoryAndData.Repository
{
    public class PetRepository:IPetRepository
    {
        private PetsContext db;
        public PetRepository(PetsContext context)
        {
            db = context;
        }

        public IEnumerable<Pet> GetAll()
        {
            return db.Pets;
        }

        public Pet Get(int id)
        {
            return db.Pets.Find(id);
        }

        public void Create(Pet pet)
        {
            db.Pets.Add(pet);
        }

        public void Update(Pet pet)
        {
            db.Entry(pet).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Pet pet = db.Pets.SingleOrDefault(p => p.Id == id);
            if (pet != null)
                db.Pets.Remove(pet);
        }
    }
}
