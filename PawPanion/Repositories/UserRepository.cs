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

       /* public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
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
                    SELECT u.Id AS UserId, u.FirstName, u.LastName, u.DisplayName, u.UserTypeId,
		                ut.Id AS TypeId, ut.Name AS TypeName
                    FROM UserProfile u
                    JOIN UserType ut ON ut.Id = u.UserTypeId
                    ORDER BY FirstName  
                    ;";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<User>();

                        while (reader.Read())
                        {
                            var userId = DbUtils.GetInt(reader, "UserId");


                            users.Add(new User()
                            {
                                Id = userId,
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                UserType = new UserType()
                                {
                                    Id = DbUtils.GetInt(reader, "TypeId"),
                                    Name = DbUtils.GetString(reader, "TypeName")
                                }
                            });
                        }

                        return users;
                    }
                }

            }
        } */

    }
}
