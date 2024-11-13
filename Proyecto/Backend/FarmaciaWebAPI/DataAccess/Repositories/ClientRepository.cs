using DataAccess.Context;
using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class ClientRepository : IRepository<T_Cliente>
    {
        private readonly ApiDbContext _context;
        public ClientRepository(ApiDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            //TO DO
            //remplazar por entity framework
            var deleted = _context.Set<T_Cliente>().Where(p => p.Id == id).FirstOrDefault();
            if (deleted != null) { return false; }
            _context.Set<T_Cliente>().Remove(deleted);
            return 1 == await _context.SaveChangesAsync();
        }

        public async Task<List<T_Cliente>?> GetAll()
        {
            return await _context.Set<T_Cliente>().ToListAsync();
        }

        public async Task<T_Cliente?> GetById(int id)
        {
            return await _context.Set<T_Cliente>().FindAsync(id);
        }

        public async Task<bool> Save(T_Cliente entity)
        {
            _context.Set<T_Cliente>().Add(entity);
            return 1 == await _context.SaveChangesAsync();
        }

        public async Task<bool> Update(T_Cliente entity)
        {
            var current = _context.Set<T_Cliente>().Find(entity.Id);
            if(current == null) { return false; }
            
            current.Nombre = entity.Nombre;
            current.Apellido = entity.Apellido;
            current.Dni = entity.Dni;
            current.Telefono = entity.Telefono;
            current.Fecha_nac = entity.Fecha_nac;
            current.ObraSocial = entity.ObraSocial;

            return 1 == await _context.SaveChangesAsync();
        }
    }
}
