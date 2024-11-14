﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DataAccess.Context;

public partial class T_Cliente
{
    [SwaggerSchema(ReadOnly = true)]
    public int Id { get; set; }

    public string Nombre { get; set; }

    public string Apellido { get; set; }

    public int? Dni { get; set; }

    public int? Telefono { get; set; }

    public DateOnly? Fecha_nac { get; set; }

    public string ObraSocial { get; set; }

    //la propiedad es internal para que el mapper no intente transferirla al dto correspondiente
    internal virtual ICollection<T_Venta> Ventas { get; set; } = new List<T_Venta>();
}