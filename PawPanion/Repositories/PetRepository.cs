using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics.Contracts;
using System.Net;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PawPanion.Models;
using PawPanion.Utils;

namespace PawPanion.Repositories
{
    public class PetRepository : BaseRepository, IPetRepository
    {
        public PetRepository(IConfiguration configuration) : base(configuration) { }


        public List<Pet> GetAllPets()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id AS PetId, p.Name AS PetName, Breed, IsMale, Birthdate, p.OwnerId, IsDog, p.ImageLocation, u.Name AS UserName, u.Id AS UserId, FirebaseUserId, Email, Phone, u.ImageLocation
                       FROM Pet p
                       JOIN [User] u ON p.OwnerId = u.Id
                       ORDER BY u.Name
				       ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Pet> pets = new List<Pet>();
                        
                        while (reader.Read())
                        {
                            Pet pet = new Pet
                            {
                                Id = DbUtils.GetInt(reader, "PetId"),
                                Name = DbUtils.GetString(reader, "PetName"),
                                Breed = DbUtils.GetString(reader, "Breed"),
                                IsMale = reader.GetBoolean(reader.GetOrdinal("IsMale")),
                                Birthdate = DbUtils.GetDateTime(reader, "Birthdate"),
                                OwnerId = DbUtils.GetInt(reader, "OwnerId"),
                                Owner = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    Name = DbUtils.GetString(reader, "UserName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    Phone = DbUtils.GetString(reader, "Phone"),
                                    ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                                },
                                IsDog = reader.GetBoolean(reader.GetOrdinal("IsDog")),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                            };


                            pets.Add(pet);
                        }

                        return pets;
                    }
                }
            }
        }

        public Pet GetPetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Name, Breed, IsMale, Birthdate, p.OwnerId, IsDog,
                       p.ImageLocation, u.Name, u.Id
                       FROM Pet p JOIN [User] u ON p.OwnerId = u.Id
                       WHERE p.Id = @Id";

                        DbUtils.AddParameter(cmd, "@Id", id);  

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Pet pet = new Pet
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Breed = DbUtils.GetString(reader, "Breed"),
                                IsMale = reader.GetBoolean(reader.GetOrdinal("IsMale")),
                                Birthdate = DbUtils.GetDateTime(reader, "Birthdate"),
                                OwnerId = DbUtils.GetInt(reader, "OwnerId")
                            };
                            return pet;
                        }
                        return null;
                    }
                }
            }
        }

        public Pet GetPetByOwnerId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Name, Breed, IsMale, Birthdate, p.OwnerId, IsDog,
                       p.ImageLocation, u.Name, u.Id
                       FROM Pet p JOIN [User] u ON p.OwnerId = u.Id
                       WHERE p.OwnerId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Pet pet = new Pet
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Breed = DbUtils.GetString(reader, "Breed"),
                                IsMale = reader.GetBoolean(reader.GetOrdinal("IsMale")),
                                Birthdate = DbUtils.GetDateTime(reader, "Birthdate"),
                                OwnerId = DbUtils.GetInt(reader, "OwnerId")
                            };
                            return pet;
                        }
                        return null;
                    }
                }
            }
        }

        public void Add(Pet pet)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Pet ([Name], Breed, IsMale, Birthdate, OwnerId, IsDog, ImageLocation)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @breed, @isMale, @birthdate, @ownerId, @isDog, @imageLocation)";
                    cmd.Parameters.AddWithValue("@name", pet.Name);
                    cmd.Parameters.AddWithValue("@breed", pet.Breed);
                    cmd.Parameters.AddWithValue("@isMale", pet.IsMale);
                    cmd.Parameters.AddWithValue("@birthdate", pet.Birthdate);
                    cmd.Parameters.AddWithValue("@ownerId", pet.OwnerId);
                    cmd.Parameters.AddWithValue("@isDog", pet.IsDog);
                    cmd.Parameters.AddWithValue("@imageLocation", pet.ImageLocation);

                    pet.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Edit(Pet pet)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Pet 
                           SET Name = @name,
                               Breed = @breed,
                               IsMale = @isMale,
                               Birthdate = @birthdate,
                               OwnerId = @ownerId,
                               IsDog = @isDog,  
                               ImageLocation = @imageLocation
                               WHERE Id = @Id
                         ";
                    DbUtils.AddParameter(cmd, "@Id", pet.Id);
                    DbUtils.AddParameter(cmd, "@name", pet.Name);
                    DbUtils.AddParameter(cmd, "@breed", pet.Breed);
                    DbUtils.AddParameter(cmd, "@isMale", pet.IsMale);
                    DbUtils.AddParameter(cmd, "@birthdate", pet.Birthdate);
                    DbUtils.AddParameter(cmd, "@ownerId", pet.OwnerId);
                    DbUtils.AddParameter(cmd, "@isDog", pet.IsDog);
                    DbUtils.AddParameter(cmd, "@imageLocation", pet.ImageLocation);

                    cmd.ExecuteNonQuery();
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
                    cmd.CommandText = "DELETE FROM Pet WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}