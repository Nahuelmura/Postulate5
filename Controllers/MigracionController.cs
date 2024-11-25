using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Postulate.Data; // Asegúrate de tener este using

public class MigracionController : Controller
{
    private readonly ApplicationDbContext _context;

    public MigracionController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult RunMigrations()
    {
        // Aplica las migraciones pendientes
        _context.Database.Migrate();

        return Content("Migraciones ejecutadas correctamente.");
    }
}