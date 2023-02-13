using PawPanion.Models;

namespace PawPanion.Repositories
{
    public interface IRecordRepository
    {
        Record GetPetRecords(int id);
    }
}