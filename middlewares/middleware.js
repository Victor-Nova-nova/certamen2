import { users } from '../repositories/usuarios.js'; // Importa la variable users desde el archivo usuarios.js en la carpeta repositories

// Middleware de autenticación
export function authMiddleware(req, res, next) {
    const authorizationToken = req.get('x-authorization'); // Obtiene el token de autorización del encabezado de la solicitud
    if (!authorizationToken) {
        // Si no se envía un token de autorización, devuelve un error 401 (No autorizado)
        return res.status(401).json({ error: 'Token de autorización no enviado. Recuerda usar el header X-Authorization' });
    }
    // Busca al usuario en la lista de usuarios utilizando el token de autorización
    const user = users.find(user => user.token === authorizationToken);
    if (!user) {
        // Si no se encuentra al usuario con el token proporcionado, devuelve un error 401 (No autorizado)
        return res.status(401).json({ error: 'Token inválido' });
    }
    // Si el usuario se encuentra, continúa con la ejecución de la siguiente función en la cadena de middleware
    next();
}
