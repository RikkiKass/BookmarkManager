using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BookmarkManager.Data
{
    public class UserRepository
    {
        private string _connectionString;
        public UserRepository(string conn)
        {
            _connectionString = conn;
        }

        public void Signup(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Users.Add(user);
            context.SaveChanges();

        }
        public User Login(string email, string password)
        {
            var user = GetUserByEmail(email);
            if (user == null)
            {
                return null;
            }
            var validPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!validPassword)
            {
                return null;
            }
            return user;
        }

        public User GetUserByEmail(string email)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }


    }
}

