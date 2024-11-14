using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    public interface IOrderable<T>
    {
        Task<List<T>?> IsOrdered(bool order);
    }
}
