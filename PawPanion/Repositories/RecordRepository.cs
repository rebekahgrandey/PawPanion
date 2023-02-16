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
                       WHERE r.PetId = @Id
                       ORDER BY Date DESC";

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






        public void Add(Record record)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Record (RecordTypeId, PetId, VetId, Date, Weight, Medication, Illness, Diet, Note)
                        OUTPUT INSERTED.ID
                        VALUES (@recordTypeId, @petId, @vetId, @date, @weight, @medication, @illness, @diet, @note)";
                    cmd.Parameters.AddWithValue("@recordTypeId", record.RecordTypeId);
                    cmd.Parameters.AddWithValue("@petId", record.PetId);
                    cmd.Parameters.AddWithValue("@vetId", record.VetId);
                    cmd.Parameters.AddWithValue("@date", record.Date);
                    cmd.Parameters.AddWithValue("@weight", record.Weight);
                    cmd.Parameters.AddWithValue("@medication", record.Medication);
                    cmd.Parameters.AddWithValue("@illness", record.Illness);
                    cmd.Parameters.AddWithValue("@diet", record.Diet);
                    cmd.Parameters.AddWithValue("@note", record.Note);

                    record.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Record WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Record> MostRecentRecordByPetId(int petId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT TOP 1 r.Id AS RecordId, r.RecordTypeId, r.PetId AS RecordPetId, r.VetId AS RVetId, r.Date, Weight, Medication, Illness,
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
                       WHERE r.PetId = @Id
                       ORDER BY Date DESC";

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


        public List<Record> GetAllRecordsByDate()
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
                       ORDER BY Date DESC
				       ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Record> records = new List<Record>();

                        while (reader.Read())
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
                                    Breed = DbUtils.GetString(reader, "Breed"),
                                    IsMale = reader.GetBoolean(reader.GetOrdinal("IsMale")),
                                    Birthdate = DbUtils.GetDateTime(reader, "Birthdate"),
                                    OwnerId = DbUtils.GetInt(reader, "PetOwnerId"),
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
                            };


                            records.Add(record);
                        }

                        return records;
                    }
                }
            }
        }



    }
}