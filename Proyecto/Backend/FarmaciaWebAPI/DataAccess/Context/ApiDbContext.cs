﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Context;

public partial class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<T_Cliente> T_Clientes { get; set; }

    public virtual DbSet<T_Detalles_Venta> T_Detalles_Ventas { get; set; }

    public virtual DbSet<T_User> T_Users { get; set; }

    public virtual DbSet<T_Venta> T_Ventas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<T_Cliente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_cliente");

            entity.Property(e => e.Apellido)
                .HasColumnName("apellido")
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasColumnName("nombre")
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ObraSocial)
                .HasColumnName("obra_social")
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<T_Detalles_Venta>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_detalle");

            entity.Property(e => e.Producto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Precio).HasColumnType("money");
            entity.Property(e => e.TotalDetalle).HasColumnType("money");

            entity.HasOne(d => d.cod_ventaNavigation).WithMany(p => p.Detalles)
                .HasForeignKey(d => d.cod_venta)
                .HasConstraintName("fk_detalle_venta");
        });

        modelBuilder.Entity<T_User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_user");

            entity.Property(e => e.Contraseña)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<T_Venta>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_venta");

            entity.Property(e => e.TotalVenta).HasColumnType("money");

            entity.HasOne(d => d.cod_clienteNavigation).WithMany(p => p.Ventas)
                .HasForeignKey(d => d.cod_cliente)
                .HasConstraintName("fk_cliente");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}