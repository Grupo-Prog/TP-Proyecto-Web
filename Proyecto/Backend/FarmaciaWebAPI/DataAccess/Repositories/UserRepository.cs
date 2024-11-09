using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DataAccess.Models.FakeContext;

namespace DataAccess.Repositories
{
    public class UserRepository 
    {
        private readonly FakeContext _context;
        public UserRepository(FakeContext context) 
        {
            _context = context;
        }
        public Task<bool> Delete(int id)
        {
            //TO DO
            throw new NotImplementedException();
        }

        public async Task<User?> GetUser(string username, string password)
        {
            var user = _context.Users.FirstOrDefault(p => p.Username == username && p.Password == password);
            //var user =  await _context.Set<User>().Where(p => p.Username == username && p.Password == password).FirstOrDefaultAsync();
            if(user == null) { return null; }
            return user;
        }

        public Task<bool> Save(User entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(User entity)
        {
            throw new NotImplementedException();
        }
    }
}
