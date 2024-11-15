using DataAccess.Context;
using DataAccess.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class MasterRepository : IMasterRepository
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
        public async Task<List<T_Venta>?> GetOrderedAsync()
        {
            return await _context.T_Ventas
                .Include(e => e.cod_clienteNavigation)
                .Include(e => e.Detalles)
                .OrderByDescending(e => e.TotalVenta)
                .ToListAsync();
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

        public async Task<bool> UpdateAsync(int id, T_Venta entity)
        {
            var current = await _context.T_Ventas
                .Where(e => e.Id == id)
                .Include(e => e.Detalles)
                .FirstOrDefaultAsync();
            if(current == null) { return false; }
            var deletedDetail = _context.T_Detalles_Ventas.Where(e => e.cod_venta == id);
            var deletedRegs = current.Detalles.Count();

            current.Fecha = entity.Fecha;
            current.cod_cliente = entity.cod_cliente;
            current.TotalVenta = entity.TotalVenta;
            current.Detalles = entity.Detalles;
            
            _context.Update(current);
            _context.T_Detalles_Ventas.RemoveRange(deletedDetail);
            int updatedRegs = await _context.SaveChangesAsync();
            int newRegs = current.Detalles.Count();
            return updatedRegs == deletedRegs + newRegs + 1; //+1 por el registro de la venta
        }
    }
}
