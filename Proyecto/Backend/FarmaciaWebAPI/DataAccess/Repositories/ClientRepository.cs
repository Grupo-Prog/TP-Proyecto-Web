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

        public async Task<bool> DeleteAsync(int id)
        {
            var ventas = await _context.T_Ventas
                .Where(p => p.cod_cliente == id)
                .ToListAsync();
            if(ventas == null || ventas.Count == 0) 
            { foreach (var venta in ventas) { venta.cod_cliente = null; } }
            _context.T_Ventas.UpdateRange(ventas);
            var deletedRegs = ventas.Count();

            var deleted = _context.T_Clientes.Where(p => p.Id == id).FirstOrDefault();
            if (deleted == null) { return false; }
            _context.T_Clientes.Remove(deleted);
            var updatedRegs = await _context.SaveChangesAsync();
            return updatedRegs == deletedRegs + 1; //+1 por el registro del cliente
        }

        public async Task<List<T_Cliente>?> GetAllAsync()
        {
            return await _context.T_Clientes.ToListAsync();
        }

        public async Task<T_Cliente?> GetByIdAsync(int id)
        {
            return await _context.T_Clientes.FindAsync(id);
        }
        public async Task<bool> SaveAsync(T_Cliente entity)
        {
            _context.T_Clientes.Add(entity);
            return 1 == await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(int id, T_Cliente entity)
        {
            var current = _context.T_Clientes.Find(id);
            if (current == null) { return false; }

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
