using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using PawPanion.Models;
using PawPanion.Utils;

namespace PawPanion.Repositories
{
    public class RecordRepository : BaseRepository, IRecordRepository
    {
        public RecordRepository(IConfiguration configuration) : base(configuration) { }

        public Record GetPetRecords(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT r.Id AS RecordId, r.RecordTypeId, r.PetId AS RecordPetId, r.VetId AS RVetId, r.Date, Weight, Medication, Illness,
                       Diet, Note,
                       rt.Id AS RTId, rt.Name AS RecordTypeName,
                       p.Id AS PetId, p.Name AS PetName, p.ImageLocation AS PetImageLocation,
                       v.Id AS VetId, v.Name AS VetName, v.ImageLocation AS VetImageLocation
                       FROM Record r
                       JOIN Pet p ON p.Id = r.PetId
                       JOIN RecordType rt ON r.RecordTypeId = rt.Id
                       JOIN [User] v ON r.VetId = v.Id
                       WHERE r.PetId = @Id";  //ADD IN THINGS THAT ARENT SHOWING IN SWAGGER

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Record record = new Record
                            {
                                Id = DbUtils.GetInt(reader, "RecordId"),
                                RecordTypeId = DbUtils.GetInt(reader, "RecordTypeId"),
                                RecordType = new RecordType()
                                {
                                    Id = DbUtils.GetInt(reader, "RTId"),
                                    Name = DbUtils.GetString(reader, "RecordTypeName"),
                                },
                                PetId = DbUtils.GetInt(reader, "RecordPetId"),
                                Pet = new Pet()
                                {
                                    Id = DbUtils.GetInt(reader, "PetId"),
                                    Name = DbUtils.GetString(reader, "PetName"),
                                    ImageLocation = DbUtils.GetString(reader, "PetImageLocation")
                                },
                                VetId = DbUtils.GetInt(reader, "RVetId"),
                                Vet = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "VetId"),
                                    Name = DbUtils.GetString(reader, "VetName")
                                },
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                Weight = (float)reader.GetDouble(reader.GetOrdinal("Weight")),
                                Medication = DbUtils.GetString(reader, "Medication"),
                                Illness = DbUtils.GetString(reader, "Illness"),
                                Diet = DbUtils.GetString(reader, "Diet"),
                                Note = DbUtils.GetString(reader, "Note")
                            };
                            return record;
                        }
                        return null;
                    }
                }
            }
        }

    }
}