using PawPanion.Models;
using System.Collections.Generic;

namespace PawPanion.Repositories
{
    public interface IRecordRepository
    {
        List<Record> GetPetRecordsByPetId(int petId);
        List<Record> MostRecentRecordByPetId(int petId);
        List<Record> GetAllRecordsByDate();
        void Add(Record record);
        void Delete(int id);
    }
}