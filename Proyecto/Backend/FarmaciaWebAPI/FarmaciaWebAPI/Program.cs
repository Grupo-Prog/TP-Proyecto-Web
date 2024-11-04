using FarmaciaWebAPI.Common;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//configuracion cors para navegadores
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
var appSettingsSection = builder.Configuration.GetSection("AppSettings");
//le indicamos al builder que la clase APPSETTINGS se corresponde con la sección del json de arriba
builder.Services.Configure<AppSettings>(appSettingsSection);



//necesitamos éste objeto para acceder a la propiedad que contiene la clave
var appSettings = appSettingsSection.Get<AppSettings>();
//utilizando la clave secreta creamos la llave para el token mediante una codificacion de bytes
//convierte la clave en un arreglo de bytes
var key = Encoding.ASCII.GetBytes(appSettings.Secret);

//configuracion del JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        //esquema de opciones
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            //ValidIssuer = Configuration["Jwt:Issuer"],
            //ValidAudience = Configuration["Jwt:Issuer"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    }
);

//inyeccion de la clase que maneja las peticiones del usuario
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//usa la configuracion de cors a�adida
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
