using RepositoryAndData.DataContext;
using RepositoryAndData.Repository.IRepository;

namespace RepositoryAndData.Repository
{
    public class UnitOfWork 
    {
        private PetsContext db;
        public IOwnerRepository OwnerRepository { get; private set; }
        public IPetRepository PetRepository { get; private set; }

        public UnitOfWork(PetsContext context)
        {
            db = context;
            OwnerRepository = new OwnerRepository(context);
            PetRepository = new PetRepository(context);
        }

        public void Save()
        {
            db.SaveChanges();
        }
    }
}
