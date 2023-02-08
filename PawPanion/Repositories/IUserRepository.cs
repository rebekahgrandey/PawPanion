using PawPanion.Models;
using System;
using System.Collections.Generic;

namespace PawPanion.Repositories
{
    public interface IUserRepository
    {
        List <User> GetAllUsers();
        User GetByFirebaseUserId(string firebaseUserId);
        void Add(User user);
    }
}