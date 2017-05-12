namespace Dto.DtoModel
{
    public class OwnerDto
    {
        //public OwnerDto()
        //{
        //    Pets = new List<PetDto>();
        //}
      
        public long Id { get; set; }
        public string Name { get; set; }

        public int PetsCount { get; set; }
      //  public List<PetDto> Pets { get; set; }

    }

}
