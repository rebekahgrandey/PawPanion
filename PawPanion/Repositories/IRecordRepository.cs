using PawPanion.Models;
using System.Collections.Generic;

namespace PawPanion.Repositories
{
    public interface IRecordRepository
    {
        List<Record> GetPetRecordsByPetId(int petId);
    }
}