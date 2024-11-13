using DataAccess.Context;
using DataAccess.Interfaces;
using DataAccess.Repositories;
using FarmaciaWebAPI.Common;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.DTOs;
using FarmaciaWebAPI.Services;
using FarmaciaWebAPI.Tools.Mapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//configuración cors para navegadores
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "CorsPolicy",
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }
    );
});

//obtenemos la parte del settings.json donde se guarda la clave
var appSettingsSection = builder.Configuration.GetSection("Jwt");
//le indicamos al builder que la clase jwt se corresponde con la sección del json de arriba
builder.Services.Configure<Jwt>(appSettingsSection);



//necesitamos este objeto para acceder a la propiedad que contiene la clave
var jwt = appSettingsSection.Get<Jwt>();
//utilizando la clave secreta creamos la llave para el token mediante una codificación de bytes
//convierte la clave en un arreglo de bytes
var key = Encoding.ASCII.GetBytes(jwt!.Secret);

//configuracion del JWT
builder.Services.AddAuthentication(p =>
{
    p.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    p.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    p.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        //esquema de opciones
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    }
);



builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

//builder.Services.AddSwaggerGen();
//configuracion del swagger para ingresar el token desde el navegador
builder.Services.AddSwaggerGen(swagger =>
{
    //titulo
    swagger.SwaggerDoc("v1", new OpenApiInfo { Title = "Farmacia Web API", Version = "v1" });
    
    //boton authorize
    swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"

    });

    swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                    }

            },
            new string[]{}
        }
    });

});

//Inyección del dbcontext
var cnnString = builder.Configuration.GetConnectionString("FarmaciaWebAPI");

builder.Services.AddDbContext<ApiDbContext>
(options =>
    options.UseSqlServer(cnnString)
);


//Inyección de Servicios
builder.Services.AddScoped<IManager<ClientDTO>, ClientService>();
//clase que maneja las peticiones del usuario
builder.Services.AddScoped<IUserService<T_User>, UserService>();

//Inyección de Repositorios
builder.Services.AddScoped<IRepository<T_Cliente>, ClientRepository>();
builder.Services.AddScoped<UserRepository>();

//Inyección de mapper
builder.Services.AddScoped<IMapperBase<ClientDTO, T_Cliente>, ClientMapper>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//usa la configuracion de cors añadida
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
