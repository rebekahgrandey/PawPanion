using PawPanion.Models;
using System.Collections.Generic;

namespace PawPanion.Repositories
{
    public interface IPetRepository
    {
        void Add(Pet pet);
        void Edit(Pet pet);
        List<Pet> GetAllPets();
        List<Pet> GetUserPets(int userId);
        Pet GetPetById(int id);
        void Delete(int id);
    }
}