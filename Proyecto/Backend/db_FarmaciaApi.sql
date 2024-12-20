CREATE DATABASE db_FarmaciaApi;
GO
USE [db_FarmaciaApi];
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
    [contrase�a] VARCHAR(80) NULL,
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

insert into T_Users(email, contrase�a)VALUES('mateo@gmail.com', 'f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae')
insert into T_Users(email, contrase�a)VALUES('test@gmail.com', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08')
INSERT INTO T_Clientes (nombre, apellido, dni, telefono, fecha_nac, obra_social) VALUES ('Juan', 'P�rez', 30567892, 1123456789, '1985-04-23', 'OSDE');
INSERT INTO T_Clientes (nombre, apellido, dni, telefono, fecha_nac, obra_social) VALUES ('Mar�a', 'G�mez', 27890123, 1145678901, '1990-10-15', 'Swiss Medical');
INSERT INTO T_Clientes (nombre, apellido, dni, telefono, fecha_nac, obra_social) VALUES ('Carlos', 'L�pez', 29543218, 1198765432, '1988-06-10', 'Galeno');
INSERT INTO T_Clientes (nombre, apellido, dni, telefono, fecha_nac, obra_social) VALUES ('Luc�a', 'Mart�nez', 32567845, 1134567890, '1992-12-01', 'Medicus');
INSERT INTO T_Clientes (nombre, apellido, dni, telefono, fecha_nac, obra_social) VALUES ('Pedro', 'Fern�ndez', 30987654, 1129876543, '1983-09-09', 'OSDE');
INSERT INTO T_Clientes (nombre, apellido, dni, telefono, fecha_nac, obra_social) VALUES ('Ana', 'S�nchez', 31234567, 1165432198, '1986-11-20', 'Omint');
INSERT INTO T_Clientes (nombre, apellido, dni, telefono, fecha_nac, obra_social) VALUES ('Miguel', 'Castro', 29876432, 1187654321, '1989-08-25', 'IOSFA');
INSERT INTO T_Clientes (nombre, apellido, dni, telefono, fecha_nac, obra_social) VALUES ('Laura', 'Su�rez', 28765431, 1176543219, '1991-03-14', 'ASE');
INSERT INTO T_Clientes (nombre, apellido, dni, telefono, fecha_nac, obra_social) VALUES ('Diego', 'R�os', 30678901, 1156789432, '1987-05-18', 'Medife');
INSERT INTO T_Clientes (nombre, apellido, dni, telefono, fecha_nac, obra_social) VALUES ('Sof�a', 'M�ndez', 32987654, 1123450987, '1993-02-22', 'Sancor Salud');

INSERT INTO T_Ventas (fecha, cod_cliente, total_venta) VALUES ('2024-01-15', 1, 1500.50);
INSERT INTO T_Ventas (fecha, cod_cliente, total_venta) VALUES ('2024-02-10', 2, 2300.75);
INSERT INTO T_Ventas (fecha, cod_cliente, total_venta) VALUES ('2024-02-18', 3, 1200.00);
INSERT INTO T_Ventas (fecha, cod_cliente, total_venta) VALUES ('2024-03-05', 4, 3100.30);
INSERT INTO T_Ventas (fecha, cod_cliente, total_venta) VALUES ('2024-03-15', 5, 4500.00);
INSERT INTO T_Ventas (fecha, cod_cliente, total_venta) VALUES ('2024-04-01', 6, 980.50);
INSERT INTO T_Ventas (fecha, cod_cliente, total_venta) VALUES ('2024-04-10', 7, 1750.00);
INSERT INTO T_Ventas (fecha, cod_cliente, total_venta) VALUES ('2024-05-03', 8, 6400.25);
INSERT INTO T_Ventas (fecha, cod_cliente, total_venta) VALUES ('2024-05-10', 9, 2100.90);
INSERT INTO T_Ventas (fecha, cod_cliente, total_venta) VALUES ('2024-05-20', 10, 5250.60);

INSERT INTO T_Detalles_Ventas (nro_detalle, nombre_producto, precio, cantidad, total_detalle, cod_venta) VALUES (1, 'Ibuprofeno 600mg', 500.00, 2, 1000.00, 1);
INSERT INTO T_Detalles_Ventas (nro_detalle, nombre_producto, precio, cantidad, total_detalle, cod_venta) VALUES (2, 'Paracetamol 500mg', 300.00, 3, 900.00, 1);
INSERT INTO T_Detalles_Ventas (nro_detalle, nombre_producto, precio, cantidad, total_detalle, cod_venta) VALUES (1, 'Amoxicilina 500mg', 750.00, 1, 750.00, 2);
INSERT INTO T_Detalles_Ventas (nro_detalle, nombre_producto, precio, cantidad, total_detalle, cod_venta) VALUES (2, 'Jarabe para la tos', 550.00, 2, 1100.00, 2);
INSERT INTO T_Detalles_Ventas (nro_detalle, nombre_producto, precio, cantidad, total_detalle, cod_venta) VALUES (1, 'Vitamina C', 250.00, 4, 1000.00, 3);
INSERT INTO T_Detalles_Ventas (nro_detalle, nombre_producto, precio, cantidad, total_detalle, cod_venta) VALUES (1, 'Antial�rgico', 400.00, 5, 2000.00, 4);
INSERT INTO T_Detalles_Ventas (nro_detalle, nombre_producto, precio, cantidad, total_detalle, cod_venta) VALUES (2, 'Gotas para ojos', 600.00, 2, 1200.00, 4);
INSERT INTO T_Detalles_Ventas (nro_detalle, nombre_producto, precio, cantidad, total_detalle, cod_venta) VALUES (1, 'Crema antibi�tica', 800.00, 3, 2400.00, 5);
INSERT INTO T_Detalles_Ventas (nro_detalle, nombre_producto, precio, cantidad, total_detalle, cod_venta) VALUES (1, 'Alcohol en gel', 300.00, 4, 1200.00, 6);
INSERT INTO T_Detalles_Ventas (nro_detalle, nombre_producto, precio, cantidad, total_detalle, cod_venta) VALUES (1, 'Vendas el�sticas', 500.00, 6, 3000.00, 7);