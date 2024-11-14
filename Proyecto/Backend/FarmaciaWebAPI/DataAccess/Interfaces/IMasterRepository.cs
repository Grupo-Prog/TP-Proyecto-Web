using DataAccess.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    public interface IMasterRepository : IRepository<T_Venta> , IOrder<T_Venta>
    {
    }
}
