using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

public class NotificacionesHub : Hub
{
    // Usamos un ConcurrentDictionary para manejar conexiones concurrentes
    private static readonly ConcurrentDictionary<int, string> _connections = new();

    public override Task OnConnectedAsync()
    {
        var userId = GetUserIdFromContext(); // Implementa esto para obtener el ID del usuario desde el contexto
        _connections[userId] = Context.ConnectionId; // Almacena el ConnectionId del usuario
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        var userId = GetUserIdFromContext(); // Implementa esto para obtener el ID del usuario desde el contexto
        _connections.TryRemove(userId, out _); // Elimina el ConnectionId al desconectarse
        return base.OnDisconnectedAsync(exception);
    }

    public static string GetConnectionId(int userId)
    {
        _connections.TryGetValue(userId, out var connectionId);
        return connectionId;
    }
    
    private int GetUserIdFromContext()
    {
        // Implementa la lógica para extraer el ID del usuario del contexto
        return int.Parse(Context.User.Identity.Name); // Por ejemplo, si estás utilizando el ID de usuario en el nombre
    }
}
