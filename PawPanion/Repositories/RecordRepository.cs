using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using PawPanion.Models;
using PawPanion.Utils;
using System.Buffers;

namespace PawPanion.Repositories
{
    public class RecordRepository : BaseRepository, IRecordRepository
    {
        public RecordRepository(IConfiguration configuration) : base(configuration) { }

        public List<Record> GetPetRecordsByPetId(int petId)
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
                       p.Id AS PetId, p.Name AS PetName, Breed, IsMale, Birthdate, p.OwnerId AS PetOwnerId, p.IsDog, p.ImageLocation AS PetImageLocation,
                       v.Id AS VetId, v.Name AS VetName, v.ImageLocation AS VetImageLocation, v.Email AS VetEmail, v.Phone AS VetPhone, v.IsVet AS VetIsVet,
                       o.Id AS OwnerId, o.Name AS OwnerName, o.Email AS OwnerEmail, o.Phone AS OwnerPhone, o.ImageLocation AS OwnerImageLocation, o.IsVet AS OwnerIsVet
                       FROM Record r
                       JOIN Pet p ON p.Id = r.PetId
                       JOIN RecordType rt ON r.RecordTypeId = rt.Id
                       JOIN [User] v ON r.VetId = v.Id
                       JOIN [User] o ON p.OwnerId = o.Id
                       WHERE r.PetId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", petId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Record> records = new();
                        
                        while (reader.Read())
                        {
                            records.Add(new Record()
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
                                    Breed = DbUtils.GetString(reader, "Breed"),
                                    IsMale = reader.GetBoolean(reader.GetOrdinal("IsMale")),
                                    Birthdate = DbUtils.GetDateTime(reader, "Birthdate"),
                                    OwnerId = DbUtils.GetInt(reader, "PetOwnerId"),
                                    //Owner = new User()
                                    //{
                                    //    Id = DbUtils.GetInt(reader, "OwnerId"),
                                    //    Name = DbUtils.GetString(reader, "OwnerName"),
                                    //    Email = DbUtils.GetString(reader, "OwnerEmail"),
                                    //    Phone = DbUtils.GetString(reader, "OwnerPhone"),
                                    //    ImageLocation = DbUtils.GetString(reader, "OwnerImageLocation"),
                                    //    IsVet = reader.GetBoolean(reader.GetOrdinal("OwnerIsVet"))
                                    //},
                                    IsDog = reader.GetBoolean(reader.GetOrdinal("IsDog")),
                                    ImageLocation = DbUtils.GetString(reader, "PetImageLocation")
                                },
                                VetId = DbUtils.GetInt(reader, "RVetId"),
                                Vet = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "VetId"),
                                    Name = DbUtils.GetString(reader, "VetName"),
                                    ImageLocation = DbUtils.GetString(reader, "VetImageLocation"),
                                    Email = DbUtils.GetString(reader, "VetEmail"),
                                    Phone = DbUtils.GetString(reader, "VetPhone"),
                                    IsVet = reader.GetBoolean(reader.GetOrdinal("VetIsVet"))
                                },
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                Weight = (float)reader.GetDouble(reader.GetOrdinal("Weight")),
                                Medication = DbUtils.GetString(reader, "Medication"),
                                Illness = DbUtils.GetString(reader, "Illness"),
                                Diet = DbUtils.GetString(reader, "Diet"),
                                Note = DbUtils.GetString(reader, "Note")
                            });
                        }
                        return records;
                    }
                }
            }
        }

    }
}