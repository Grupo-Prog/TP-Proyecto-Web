CREATE DATABASE db_FarmaciaAPI;
GO
USE [db_FarmaciaAPI];
GO

CREATE TABLE [dbo].[T_Clientes](
    [id] INT IDENTITY(1,1) NOT NULL,
    [nombre] VARCHAR(50) NULL,
    [apellido] VARCHAR(50) NULL,
    [dni] INT NULL,
    [telefono] INT NULL,
    [fecha_nac] DATE NULL,
    [obra_social] VARCHAR(50) NULL,
    CONSTRAINT [pk_cliente] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY];
GO

CREATE TABLE [dbo].[T_Detalles_Ventas](
    [id] INT IDENTITY(1,1) NOT NULL,
    [nro_detalle] INT NULL,
    [nombre_producto] VARCHAR(50) NULL,
    [precio] MONEY NULL,
    [cantidad] INT NULL,
    [total_detalle] MONEY NULL,
    [cod_venta] INT NULL,
    CONSTRAINT [pk_detalle] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY];
GO

CREATE TABLE [dbo].[T_Users](
    [id] INT IDENTITY(1,1) NOT NULL,
    [email] VARCHAR(50) NULL,
    [contraseña] VARCHAR(80) NULL,
    CONSTRAINT [pk_user] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY];
GO

CREATE TABLE [dbo].[T_Ventas](
    [id] INT IDENTITY(1,1) NOT NULL,
    [fecha] DATE NULL,
    [cod_cliente] INT NULL,
    [total_venta] MONEY NULL,
    CONSTRAINT [pk_venta] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY];
GO

ALTER TABLE [dbo].[T_Detalles_Ventas] WITH CHECK ADD CONSTRAINT [fk_detalle_venta] FOREIGN KEY([cod_venta])
REFERENCES [dbo].[T_Ventas] ([id]);
GO

ALTER TABLE [dbo].[T_Detalles_Ventas] CHECK CONSTRAINT [fk_detalle_venta];
GO

ALTER TABLE [dbo].[T_Ventas] WITH CHECK ADD CONSTRAINT [fk_cliente] FOREIGN KEY([cod_cliente])
REFERENCES [dbo].[T_Clientes] ([id]);
GO

ALTER TABLE [dbo].[T_Ventas] CHECK CONSTRAINT [fk_cliente];
GO

insert into T_Users(email, contraseña)VALUES('mateo@gmail.com', 'f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae')
insert into T_Users(email, contraseña)VALUES('test@gmail.com', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08')