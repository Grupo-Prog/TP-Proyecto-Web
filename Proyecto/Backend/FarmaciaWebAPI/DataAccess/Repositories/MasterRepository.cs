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
    public class MasterRepository : IRepository<T_Venta>
    {
        private readonly ApiDbContext _context;
        public MasterRepository(ApiDbContext context)
        {
            _context = context;
        }
        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<T_Venta>?> GetAllAsync()
        {
            return await _context.T_Ventas
                .Include(e => e.cod_clienteNavigation)
                .Include(e => e.Detalles)
                .ToListAsync();
        }

        public async Task<T_Venta?> GetByIdAsync(int id)
        {
            return await _context.T_Ventas
                .Include(e => e.cod_clienteNavigation)
                .Include(e => e.Detalles)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public Task<bool> SaveAsync(T_Venta entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(int id, T_Venta entity)
        {
            throw new NotImplementedException();
        }
    }
}
