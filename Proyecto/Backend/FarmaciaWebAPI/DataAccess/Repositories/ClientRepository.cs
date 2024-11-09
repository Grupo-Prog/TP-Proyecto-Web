using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class ClientRepository : IRepository<ModeloCliente>
    {
        private readonly FakeContext _context;
        public ClientRepository(FakeContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            //TO DO
            //remplazar por entity framework
            var deleted = _context.Set<ModeloCliente>().Where(p => p.Id == id).FirstOrDefault();
            if (deleted != null) { return false; }
            _context.Set<ModeloCliente>().Remove(deleted);
            return 1 == await _context.SaveChangesAsync();
        }

        public async Task<List<ModeloCliente>?> GetAll()
        {
            return await _context.Set<ModeloCliente>().ToListAsync();
        }

        public async Task<ModeloCliente?> GetById(int id)
        {
            return await _context.Set<ModeloCliente>().FindAsync(id);
        }

        public async Task<bool> Save(ModeloCliente entity)
        {
            _context.Set<ModeloCliente>().Add(entity);
            return 1 == await _context.SaveChangesAsync();
        }

        public async Task<bool> Update(ModeloCliente entity)
        {
            var current = _context.Set<ModeloCliente>().Find(entity.Id);
            if(current == null) { return false; }
            
            current.Nombre = entity.Nombre;
            current.Apellido = entity.Apellido;
            current.Direccion = entity.Direccion;
            current.Telefono = entity.Telefono;

            return 1 == await _context.SaveChangesAsync();
        }
    }
}
