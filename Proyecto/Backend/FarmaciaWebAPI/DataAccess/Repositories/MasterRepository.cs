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
        public async Task<bool> DeleteAsync(int id)
        {
            var deleted = _context.T_Ventas
                .Include(e => e.cod_clienteNavigation)
                .Include(e => e.Detalles)
                .FirstOrDefault(e => e.Id == id);
            if (deleted == null) { return false; }

            _context.T_Detalles_Ventas.RemoveRange(deleted.Detalles);
            _context.T_Ventas.Remove(deleted);
            int deletedRegs = await _context.SaveChangesAsync();
            int detailCount = deleted.Detalles.Count();
            if (detailCount == 0)
            {
                return deletedRegs == 1;
            }
            return deletedRegs == detailCount + 1; //+1 por el registro de la venta
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

        public async Task<bool> SaveAsync(T_Venta entity)
        {
            if (null == await _context.T_Clientes.FindAsync(entity.cod_cliente))
            {
                return false;
            }
            _context.Add(entity);
            int savedRegs = await _context.SaveChangesAsync();
            int detailCount = entity.Detalles.Count();
            return savedRegs == detailCount + 1; //+1 por el registro de la venta
        }

        public Task<bool> UpdateAsync(int id, T_Venta entity)
        {
            throw new NotImplementedException();
        }
    }
}
