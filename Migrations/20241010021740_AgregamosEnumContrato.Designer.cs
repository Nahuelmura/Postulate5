﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Postulate.Data;

#nullable disable

namespace Postulate.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241010021740_AgregamosEnumContrato")]
    partial class AgregamosEnumContrato
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Name")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Postulate.Models.ContratoRespondido", b =>
                {
                    b.Property<int>("ContratoRespondidoID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ContratoRespondidoID"));

                    b.Property<DateTime>("FechaMatch")
                        .HasColumnType("datetime2");

                    b.Property<int>("PersonaID")
                        .HasColumnType("int");

                    b.Property<int>("ProfesionID")
                        .HasColumnType("int");

                    b.Property<bool>("Respuesta")
                        .HasColumnType("bit");

                    b.Property<int>("RespuestaDesolicitud")
                        .HasColumnType("int");

                    b.Property<int>("ServicioID")
                        .HasColumnType("int");

                    b.Property<int>("TrabajoID")
                        .HasColumnType("int");

                    b.HasKey("ContratoRespondidoID");

                    b.ToTable("ContratoRespondidos");
                });

            modelBuilder.Entity("Postulate.Models.Imagen", b =>
                {
                    b.Property<int?>("ImagenID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("ImagenID"));

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte?>("Foto")
                        .HasColumnType("tinyint");

                    b.Property<int>("ServicioID")
                        .HasColumnType("int");

                    b.Property<string>("Titulo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ImagenID");

                    b.ToTable("Imagen");
                });

            modelBuilder.Entity("Postulate.Models.Localidad", b =>
                {
                    b.Property<int>("LocalidadID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LocalidadID"));

                    b.Property<int>("CodigoPostal")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ProvinciaID")
                        .HasColumnType("int");

                    b.HasKey("LocalidadID");

                    b.HasIndex("ProvinciaID");

                    b.ToTable("Localidades");
                });

            modelBuilder.Entity("Postulate.Models.Persona", b =>
                {
                    b.Property<int>("PersonaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PersonaID"));

                    b.Property<string>("Apellido")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Documento")
                        .HasColumnType("int");

                    b.Property<int>("Edad")
                        .HasColumnType("int");

                    b.Property<bool>("Eliminado")
                        .HasColumnType("bit");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LocalidadID")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Telefono")
                        .HasColumnType("int");

                    b.HasKey("PersonaID");

                    b.HasIndex("LocalidadID");

                    b.ToTable("Personas");
                });

            modelBuilder.Entity("Postulate.Models.Profesion", b =>
                {
                    b.Property<int>("ProfesionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProfesionID"));

                    b.Property<string>("Matricula")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProfesionID");

                    b.ToTable("Profesiones");
                });

            modelBuilder.Entity("Postulate.Models.Provincia", b =>
                {
                    b.Property<int>("ProvinciaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProvinciaID"));

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProvinciaID");

                    b.ToTable("Provincias");
                });

            modelBuilder.Entity("Postulate.Models.Servicio", b =>
                {
                    b.Property<int>("ServicioID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ServicioID"));

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Herramienta")
                        .HasColumnType("bit");

                    b.Property<string>("Institucion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PersonaID")
                        .HasColumnType("int");

                    b.Property<int>("ProfesionID")
                        .HasColumnType("int");

                    b.Property<string>("Titulo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ServicioID");

                    b.HasIndex("PersonaID");

                    b.HasIndex("ProfesionID");

                    b.ToTable("Servicios");
                });

            modelBuilder.Entity("Postulate.Models.Trabajo", b =>
                {
                    b.Property<int>("TrabajoID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TrabajoID"));

                    b.Property<string>("Comentario")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Direccion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Fecha")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Hora")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ImagenID")
                        .HasColumnType("int");

                    b.Property<int>("PersonaID")
                        .HasColumnType("int");

                    b.Property<int>("ProfesionID")
                        .HasColumnType("int");

                    b.Property<int>("Valoracion")
                        .HasColumnType("int");

                    b.HasKey("TrabajoID");

                    b.HasIndex("ImagenID");

                    b.HasIndex("PersonaID");

                    b.HasIndex("ProfesionID");

                    b.ToTable("Trabajos");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Postulate.Models.Localidad", b =>
                {
                    b.HasOne("Postulate.Models.Provincia", "Provincia")
                        .WithMany("Localidades")
                        .HasForeignKey("ProvinciaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Provincia");
                });

            modelBuilder.Entity("Postulate.Models.Persona", b =>
                {
                    b.HasOne("Postulate.Models.Localidad", "Localidad")
                        .WithMany("Personas")
                        .HasForeignKey("LocalidadID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Localidad");
                });

            modelBuilder.Entity("Postulate.Models.Servicio", b =>
                {
                    b.HasOne("Postulate.Models.Persona", "Persona")
                        .WithMany("Servicios")
                        .HasForeignKey("PersonaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Postulate.Models.Profesion", "Profesion")
                        .WithMany("Servicios")
                        .HasForeignKey("ProfesionID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Persona");

                    b.Navigation("Profesion");
                });

            modelBuilder.Entity("Postulate.Models.Trabajo", b =>
                {
                    b.HasOne("Postulate.Models.Imagen", "Imagen")
                        .WithMany("Trabajo")
                        .HasForeignKey("ImagenID");

                    b.HasOne("Postulate.Models.Persona", "Persona")
                        .WithMany()
                        .HasForeignKey("PersonaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Postulate.Models.Profesion", "Profesion")
                        .WithMany("Trabajos")
                        .HasForeignKey("ProfesionID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Imagen");

                    b.Navigation("Persona");

                    b.Navigation("Profesion");
                });

            modelBuilder.Entity("Postulate.Models.Imagen", b =>
                {
                    b.Navigation("Trabajo");
                });

            modelBuilder.Entity("Postulate.Models.Localidad", b =>
                {
                    b.Navigation("Personas");
                });

            modelBuilder.Entity("Postulate.Models.Persona", b =>
                {
                    b.Navigation("Servicios");
                });

            modelBuilder.Entity("Postulate.Models.Profesion", b =>
                {
                    b.Navigation("Servicios");

                    b.Navigation("Trabajos");
                });

            modelBuilder.Entity("Postulate.Models.Provincia", b =>
                {
                    b.Navigation("Localidades");
                });
#pragma warning restore 612, 618
        }
    }
}
