using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Postulate.Data;
using Postulate.Models;

using Microsoft.AspNetCore.SignalR;

namespace Postulate.Controllers

{
    public class ContratoRespondidoController : Controller
    {
        private readonly ILogger<ContratoRespondidoController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _rolManager;




        public ContratoRespondidoController(ILogger<ContratoRespondidoController> logger, ApplicationDbContext context, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> rolManager)
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;
            _rolManager = rolManager;
           
        }


   


        public async  Task<JsonResult> MostarAlertaServiciosOfrecidos()
        {

            var usuarioLogueado = await  _userManager.GetUserAsync(HttpContext.User);
            var correoUsuarioLogueado = usuarioLogueado?.Email;
            var personaLogueada = await  _context.Personas.FirstOrDefaultAsync(p => p.Email == correoUsuarioLogueado);
            var personaIDLogueada = personaLogueada?.PersonaID;
   


      var tieneSolicitudes = await _context.ContratoRespondidos
        .AnyAsync(cr => cr.RespuestaDesolicitud == Estado.Pendiente && cr.PersonaID == personaIDLogueada);

            // var tieneSolicitudes = _context.ContratoRespondidos.Any(cr => cr.RespuestaDesolicitud == Estado.Pendiente && cr.PersonaID == personaIDLogueada);

            if (tieneSolicitudes)
            {
                return Json(new { mostrarAlerta = true, mensaje = "Tiene solicitudes pendientes a en sus servicios Ofrecidos Responde!." });
            }
            else
            {
                return Json(new { mensaje = "No tiene solicitudes pendientes." });
            }

            // el js del controlador esta en el index del home  alerta de solicitudes  servicios ofrecidos//
        }




// public JsonResult MostarAlertaServiciosOfrecidos()
// {
    
//     var usuarioLogueado = _userManager.GetUserAsync(HttpContext.User).Result;
//     var correoUsuarioLogueado = usuarioLogueado?.Email;


//     var personaLogueada = _context.Personas.FirstOrDefault(p => p.Email == correoUsuarioLogueado);
//     var personaIDLogueada = personaLogueada?.PersonaID;

    
//     var tieneSolicitudes = _context.ContratoRespondidos
//         .Any(cr => cr.RespuestaDesolicitud == Estado.Pendiente && cr.PersonaID == personaIDLogueada);

   
//     if (tieneSolicitudes)
//     {
//         return Json(new { mensaje = "Tiene solicitudes pendientes en sus servicios ofrecidos. ¡Responde!" });
//     }
//     else
//     {
//         return Json(new { mensaje = "No tiene solicitudes pendientes." });
//     }

//      // el js del controlador esta en el index del home  alerta de solicitudes  servicios ofrecidos//
// }




//en este metodo/controlador que abre el de pustular en servicio solicitado (abrirModalPostular)


        public JsonResult BuscarServiciosTrabajo(int trabajoID, int servicioID)
        {

            var usuarioLogueado = _userManager.GetUserAsync(HttpContext.User).Result;
            var correoUsuarioLogueado = usuarioLogueado?.Email;

            var personaLogueada = _context.Personas.FirstOrDefault(p => p.Email == correoUsuarioLogueado);
            var personaIDLogueada = personaLogueada?.PersonaID;
            var nombrePersonaLogueada = personaLogueada?.Nombre;

            ViewBag.PersonaIDLogueada = personaIDLogueada;
            ViewBag.NombrePersonaLogueada = nombrePersonaLogueada;


            // en base al id del trabajo requerido debemos buscar la profesion asociada a ese trabajo

            var TrabajoProfesionId = _context.Trabajos.Where(t => t.TrabajoID == trabajoID).Select(p => p.ProfesionID).FirstOrDefault();


            // una vez que tenemos la profesion debemos buscar los servicios asociados a esa profesion, incluimos a la entidad persona

            var serviciosProfesion = _context.Servicios.Where(s => s.ProfesionID == TrabajoProfesionId && s.PersonaID != personaIDLogueada).Include(s => s.Persona);

            // crea una lista vacio del tipo del objeto que vamos a mostrar 
            List<ContratoRespondidoVista> ContratosRespondidoMostrar = new List<ContratoRespondidoVista>();



            // en base a los serviciosProfecion por cada uno crear un contrato en vista

            foreach (var servicio in serviciosProfesion)
            {





                var ContratoRespondidoMostrar = new ContratoRespondidoVista
                {
                    ServicioID = servicio.ServicioID,
                    NombrePersona = servicio.Persona.Nombre,
                    ApellidoPersona = servicio.Persona.Apellido,
                   
                    

                };

                ContratosRespondidoMostrar.Add(ContratoRespondidoMostrar);

            }



            return Json(ContratosRespondidoMostrar);


        }







        public JsonResult SolicitarServicios(int servicioID, int trabajoID)
        {
            var servicio = _context.Servicios.Include(s => s.Persona).FirstOrDefault(s => s.ServicioID == servicioID);
            var trabajo = _context.Trabajos.FirstOrDefault(t => t.TrabajoID == trabajoID);



            // Verificar si ya existe una solicitud para este servicio y trabajo
            bool solicitudExistente = _context.ContratoRespondidos
                .Any(cr => cr.ServicioID == servicioID && cr.TrabajoID == trabajoID && cr.PersonaID == servicio.Persona.PersonaID);

            if (solicitudExistente)
            {
                return Json(new { success = false, mensaje = "Ya existe una solicitud para este servicio Paciencia ya responderan ." });
            }

            // Crear una nueva solicitud si no existe una solicitud previa
            var contratoRespondido = new ContratoRespondido
            {
                ServicioID = servicio.ServicioID,
                TrabajoID = trabajo.TrabajoID,
                ProfesionID = servicio.ProfesionID,
                PersonaID = servicio.Persona.PersonaID,
                FechaMatch = DateTime.Now,
                RespuestaDesolicitud = Estado.Pendiente
            };

            _context.ContratoRespondidos.Add(contratoRespondido);
            _context.SaveChanges();

            return Json(new { success = true, mensaje = "Solicitud enviada exitosamente." });
        }




        public async Task<JsonResult> ListadoServicioSolicitado(int servicioID)
        {
            var usuarioLogueado = await _userManager.GetUserAsync(HttpContext.User);

            var correoUsuarioLogueado = usuarioLogueado.Email;
            var personaLogueada = _context.Personas.FirstOrDefault(p => p.Email == correoUsuarioLogueado);
            var personaIDLogueada = personaLogueada.PersonaID;

      
            var datosServicios = _context.ContratoRespondidos
                .Include(e => e.Persona)
                .Include(e => e.Trabajo)
                .Include(e => e.Servicio)
                .Where(e => e.Servicio.PersonaID == personaIDLogueada && e.ServicioID == servicioID) 
                .ToList();


                if (datosServicios == null )
             {
     return  Json(new { success = false,message ="no hay solicitudes a este servicio"});
            }

            var DatosServicio = datosServicios.Select(e => new ContratoRespondidoVista
            {
                ContratoRespondidoID = e.ContratoRespondidoID,
                ServicioID = e.ServicioID,
                ProfesionID = e.ProfesionID,
                StringFechaMatch = e.FechaMatch.ToString("dd/MM/yyyy"),
                NombrePersona = e.Persona.Nombre,
                DireccionTrabajo = e.Trabajo.Direccion,
                HoraSolicitadaTrabajo = e.Trabajo.Hora.ToString("HH:mm"),
                FechaSolicitadaTrabajo = e.Trabajo.Fecha.ToString("dd/MM/yyyy"),
                DescripcionTrabajo = e.Trabajo.Descripcion,
                ComentarioTrabajo = e.Trabajo.Comentario,
                Respuesta = e.Respuesta,
                RespuestaDesolicitud = e.RespuestaDesolicitud,
                RespuestaDesolicitudString = e.RespuestaDesolicitud.ToString().ToUpper()
            }).ToList();

            return Json(DatosServicio);
        }









       public JsonResult CambiarEstado(int contratoRespondidoID, string estado)
{
    var contrato = _context.ContratoRespondidos.FirstOrDefault(c => c.ContratoRespondidoID == contratoRespondidoID);

    if (contrato != null)
    {
        // Verificar si ya está en un estado aceptado o rechazado
        if (contrato.RespuestaDesolicitud == Estado.Aceptado || contrato.RespuestaDesolicitud == Estado.Rechazado)
        {
            return Json(new { success = false, mensaje = "El estado ya ha sido modificado y no se puede cambiar nuevamente." });
        }

        // Cambiar el estado según la acción
        if (estado == "aceptar")
        {
            contrato.RespuestaDesolicitud = Estado.Aceptado;
        }
        else if (estado == "rechazar")
        {
            contrato.RespuestaDesolicitud = Estado.Rechazado;
        }

        _context.SaveChanges();
        return Json(new { success = true, mensaje = "Estado actualizado correctamente." });
    }

    return Json(new { success = false, mensaje = "Contrato no encontrado." });
}













//este es el metodo/controlador de ver respuestas en trabajo solicitado el js esta en trabajo.1.0.0js


        public JsonResult ListadoTrabajosPostulados(int trabajoID)
        {
            // Obtener el usuario logueado
            var usuarioLogueado = _userManager.GetUserAsync(HttpContext.User).Result;
            var correoUsuarioLogueado = usuarioLogueado?.Email;

            // Obtener la persona asociada al usuario logueado
            var personaLogueada = _context.Personas.FirstOrDefault(p => p.Email == correoUsuarioLogueado);
            var personaIDLogueada = personaLogueada?.PersonaID;

            if (personaIDLogueada == null)
            {
                return Json(new { success = false, mensaje = "No se encontró una persona asociada al usuario logueado." });
            }

            // Obtener los trabajos donde la persona logueada ha postulado a los servicios de otras personas
            var trabajosPostulados = _context.ContratoRespondidos
                .Include(c => c.Trabajo)
                .Include(c => c.Servicio)
                .ThenInclude(s => s.Persona)
                .Where(c => c.Trabajo.PersonaID == personaIDLogueada && c.TrabajoID == trabajoID)
                .ToList();


            var trabajosConRespuestas = trabajosPostulados.Select(c => new
            {
                TrabajoID = c.TrabajoID,
                DescripcionTrabajo = c.Trabajo.Descripcion,
                ComentarioTrabajo = c.Trabajo.Comentario,
                ServicioID = c.ServicioID,
                NombrePersonaServicio = c.Servicio.Persona.Nombre,
                ApellidoPersonaServicio = c.Servicio.Persona.Apellido,
                EmailPersonaServicio = c.Servicio.Persona.Email,
                Respuesta = c.Respuesta ? "Aceptado" : "Rechazado",
                EstadoSolicitud = c.RespuestaDesolicitud.ToString(),
                FechaPostulacion = c.FechaMatch.ToString("dd/MM/yyyy")
            }).ToList();

            return Json(trabajosConRespuestas);
        }








        public async Task<JsonResult> CardTrabajosDetalle(int trabajoID, string NombreProfesion)
        {
            Console.WriteLine("ID del trabajo recibido:", trabajoID);  

            

            var usuarioLogueado = await _userManager.GetUserAsync(HttpContext.User);
            var correoUsuarioLogueado = usuarioLogueado?.Email;

            List<VistaProfesion> tiposProfesionMostrar = new List<VistaProfesion>();

            var trabajosPublicadosPorUsuario = _context.Trabajos
                .Include(t => t.Persona)
                .Include(t => t.Profesion)
                .Where(t => t.Persona.Email == correoUsuarioLogueado && t.TrabajoID == trabajoID)  
                .ToList();

            var trabajos = trabajosPublicadosPorUsuario;

            if (!string.IsNullOrEmpty(NombreProfesion))
            {
                trabajos = trabajos.Where(t => t.Profesion.Nombre == NombreProfesion).ToList();
            }

            foreach (var trabajo in trabajos)
            {
                var tipoProfesionMostrar = tiposProfesionMostrar.SingleOrDefault(t => t.ProfesionID == trabajo.ProfesionID);
                if (tipoProfesionMostrar == null)
                {
                    tipoProfesionMostrar = new VistaProfesion
                    {
                        ProfesionID = trabajo.ProfesionID,
                        Nombre = trabajo.Profesion.Nombre,
                        ListadoPersonas = new List<VistaTrabajoPersonas>(),
                    };
                    tiposProfesionMostrar.Add(tipoProfesionMostrar);
                }

                var VistaTrabajoPersonas = new VistaTrabajoPersonas
                {
                    NombrePersona = trabajo.Persona.Nombre,
                    ApellidoPersona = trabajo.Persona.Apellido,
                    TelefonoPersona = trabajo.Persona.Telefono,
                    TrabajoID = trabajo.TrabajoID,
                    ImagenID = trabajo.ImagenID,
                    PersonaID = trabajo.PersonaID,
                    Direccion = trabajo.Direccion,
                    Descripcion = trabajo.Descripcion,
                    Hora = trabajo.Hora,
                    Horastring = trabajo.Hora.ToString("HH:mm"),
                    Fechastring = trabajo.Fecha.ToString("dd/MM/yyyy"),
                    Comentario = trabajo.Comentario,
                };

                tipoProfesionMostrar.ListadoPersonas.Add(VistaTrabajoPersonas);
            }

            return Json(tiposProfesionMostrar);
        }





    }
}











































