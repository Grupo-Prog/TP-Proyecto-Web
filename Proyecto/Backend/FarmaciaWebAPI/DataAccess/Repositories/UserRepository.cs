﻿using DataAccess.Context;
using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccess.Repositories
{
    public class UserRepository
    {
        private readonly ApiDbContext _context;

        public UserRepository(ApiDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Delete(int id)
        {
            var deleted = _context.T_Users.Find(id);
            if(deleted == null) { return false; }
            _context.T_Users.Remove(deleted);
            return 1 == await _context.SaveChangesAsync();
        }

        public async Task<List<T_User>?> GetAll()
        {
            var lst = await _context.T_Users.ToListAsync();
            if (lst.Count == 0 || lst == null) { return null; }
            return lst;
        }
        public async Task<T_User?> GetUser(string email, string password)
        {
            var user = await _context.T_Users.Where(p => 
            p.Email == email && p.Contraseña == password).FirstOrDefaultAsync();
            if (user == null) { return null; }
            return user;
        }

        public async Task<bool> Save(T_User entity)
        {
            _context.T_Users.Add(entity);
            return 1 == await _context.SaveChangesAsync();
        }

    }
}
