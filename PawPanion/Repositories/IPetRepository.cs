using PawPanion.Models;
using System.Collections.Generic;

namespace PawPanion.Repositories
{
    public interface IPetRepository
    {
        void Add(Pet pet);
        void Edit(Pet pet);
        List<Pet> GetAllPets();
        Pet GetPetById(int id);
        Pet GetPetByOwnerId(int id);
        void Delete(int id);
    }
}