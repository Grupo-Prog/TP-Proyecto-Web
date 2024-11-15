using DataAccess.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    public interface IClientRepository : IRepository<T_Cliente> , IOrder<T_Cliente>
    {
    }
}
