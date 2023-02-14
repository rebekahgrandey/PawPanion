using PawPanion.Models;
using System.Collections.Generic;

namespace PawPanion.Repositories
{
    public interface IRecordRepository
    {
        List<Record> GetPetRecordsByPetId(int petId);
        void Add(Record record);
        void Delete(int id);
    }
}