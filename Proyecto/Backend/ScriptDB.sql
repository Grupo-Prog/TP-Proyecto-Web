USE [db_FarmaciaAPI]
GO
/****** Object:  Table [dbo].[T_Clientes]    Script Date: 13/11/2024 23:21:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Clientes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[apellido] [varchar](50) NULL,
	[dni] [int] NULL,
	[telefono] [int] NULL,
	[fecha_nac] [date] NULL,
	[obra_social] [varchar](50) NULL,
 CONSTRAINT [pk_cliente] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Detalles_Ventas]    Script Date: 13/11/2024 23:21:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Detalles_Ventas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nro_detalle] [int] NULL,
	[nombre_producto] [varchar](50) NULL,
	[precio] [money] NULL,
	[cantidad] [int] NULL,
	[total_detalle] [money] NULL,
	[cod_venta] [int] NULL,
 CONSTRAINT [pk_detalle] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Users]    Script Date: 13/11/2024 23:21:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](50) NULL,
	[contraseña] [varchar](80) NULL,
 CONSTRAINT [pk_user] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Ventas]    Script Date: 13/11/2024 23:21:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Ventas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [date] NULL,
	[cod_cliente] [int] NULL,
	[total_venta] [money] NULL,
 CONSTRAINT [pk_venta] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[T_Detalles_Ventas]  WITH CHECK ADD  CONSTRAINT [fk_detalle_venta] FOREIGN KEY([cod_venta])
REFERENCES [dbo].[T_Ventas] ([id])
GO
ALTER TABLE [dbo].[T_Detalles_Ventas] CHECK CONSTRAINT [fk_detalle_venta]
GO
ALTER TABLE [dbo].[T_Ventas]  WITH CHECK ADD  CONSTRAINT [fk_cliente] FOREIGN KEY([cod_cliente])
REFERENCES [dbo].[T_Clientes] ([id])
GO
ALTER TABLE [dbo].[T_Ventas] CHECK CONSTRAINT [fk_cliente]
GO

insert into T_Users(email, contraseña)VALUES('mateo@gmail.com', 'f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae')
insert into T_Users(email, contraseña)VALUES('test@gmail.com', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08')