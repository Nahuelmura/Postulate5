using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Postulate.Data;
using Postulate.Models;

namespace Postulate.Controllers;

public class TiposProfesion : Controller
{
    private readonly ILogger<TiposProfesion> _logger;
    
        private readonly ApplicationDbContext _context;

    public TiposProfesion(ILogger<TiposProfesion> logger,ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public IActionResult Index()
    {
        return View("TiposProfesion");
    }

      public JsonResult  ListadoProfesion( int? id)
        {
            var profesion = _context.Profesiones.ToList();

            if (id != null){
                profesion = profesion.Where(t => t.ProfesionID == id).ToList();
            }

            return Json(profesion);
            
        }

           public IActionResult GuardarProfesion(int profesionID, string nombre, string matricula)
{
    string resultado = "";
    // if (nombre != null)
    if (!String.IsNullOrEmpty(nombre))
    {
        if(profesionID == 0)
        {
            var existeProfesion = _context.Profesiones.Where(t => t.Nombre == nombre).Count();
            if (existeProfesion == 0)
            {

                var nuevaProfesion = new Profesion
        {
            Nombre = nombre.ToUpper(),
            Matricula = matricula
        }; 
         _context.Profesiones.Add(nuevaProfesion);
        _context.SaveChanges();

            
            }
            else
            {
                resultado = "ya existe un registro con ese nombre ";

            }
    }
 
    else
    {
        var ProfesionEditar = _context.Profesiones.Where(t => t.ProfesionID == profesionID).SingleOrDefault();
        if (ProfesionEditar != null)
        {
            var existeProfesion = _context.Profesiones.Where( t => t.Nombre == nombre && t.ProfesionID != profesionID ).Count();

            if (existeProfesion == 0)
            {
                 ProfesionEditar.Nombre = nombre.ToUpper();
                 ProfesionEditar.Matricula = matricula;
            _context.SaveChanges();
            }
            else
            {
                resultado = "ya existe ";
            }
           
        

        }
        else
        {
            resultado ="DEBE INGRESAR UNA NOMBRE";
        }
    }
}
return Json(resultado);

}
      

public JsonResult EliminarProfesion(int profesionID)
{
    bool eliminado = false;

    // Verificar si existen personas asociadas a esta profesión
    var existePersona = _context.Servicios.Where(t => t.ProfesionID == profesionID).Count();

    // Si no hay personas asociadas, eliminar la profesión
    if (existePersona == 0)
    {
        var profesion = _context.Profesiones.Find(profesionID);
        
        // Verificar que la profesión existe
        if (profesion != null)
        {
            _context.Remove(profesion);
            _context.SaveChanges();
            eliminado = true;  // Marcar que fue eliminada con éxito
        }
    }

    return Json(eliminado);
}
    



   

}


    

    