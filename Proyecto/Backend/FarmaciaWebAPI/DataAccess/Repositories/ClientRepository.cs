using DataAccess.Interfaces;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class ClientRepository : IRepository<ModeloCliente>
    {
        
        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<ModeloCliente>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<ModeloCliente> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Save(ModeloCliente entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(ModeloCliente entity)
        {
            throw new NotImplementedException();
        }
    }
}
