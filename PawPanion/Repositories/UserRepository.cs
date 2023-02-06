using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using PawPanion.Models;
using PawPanion.Utils;

namespace PawPanion.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirebaseUserId, Name, Email, Phone, ImageLocation, IsVet
                          FROM User
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Phone = DbUtils.GetString(reader, "Phone"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            IsVet = reader.GetBoolean(reader.GetOrdinal("IsVet"))
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, FirebaseUserId, Name, Email, Phone, ImageLocation, IsVet
                    FROM [User]
                    ORDER BY Name;";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<User>();

                        while (reader.Read())
                        {


                            users.Add(new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Phone = DbUtils.GetString(reader, "Phone"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                IsVet = reader.GetBoolean(reader.GetOrdinal("IsVet"))
                            });
                        }

                        return users;
                    }
                }

            }
        }

    }
}
