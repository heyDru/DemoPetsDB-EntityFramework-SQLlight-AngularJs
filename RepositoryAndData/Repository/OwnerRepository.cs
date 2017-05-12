using RepositoryAndData.DataContext;
using RepositoryAndData.Repository.IRepository;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace RepositoryAndData.Repository
{
    public class OwnerRepository: IOwnerRepository
    {
        private PetsContext db;
        public OwnerRepository(PetsContext context)
        {
            db = context;
        }

        public IEnumerable<Owner> GetAll()
        {
            return db.Owners;
        }

        public Owner Get(int id)
        {
            return db.Owners.Find(id);
        }

        public void Create(Owner owner)
        {
            db.Owners.Add(owner);
        }

        public void Update(Owner owner)
        {
            db.Entry(owner).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Owner owner = db.Owners.SingleOrDefault(o=>o.Id==id);
            if (owner != null)
                db.Owners.Remove(owner);
        }
    }
}
