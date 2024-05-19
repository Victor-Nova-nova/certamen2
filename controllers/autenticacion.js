import { Router } from "express";
import { randomBytes } from 'crypto'; // Importa la función randomBytes del módulo crypto
import { logout } from '../repositories/usuarios.js'; // Importa la función logout desde el archivo usuarios.js en la carpeta repositories
import { authMiddleware } from '../middlewares/middleware.js'; // Importa el middleware authMiddleware desde el archivo middleware.js en la carpeta middlewares
import { checkPassword, users } from '../repositories/usuarios.js'; // Importa la función checkPassword y la variable users desde el archivo usuarios.js en la carpeta repositories

const router = Router(); // Crea un nuevo router de Express

// Ruta para el inicio de sesión
router.post('/api/login', async (req, res) => {
    const { username, password } = req.body; // Extrae el username y password del cuerpo de la solicitud
    // Verifica si username y password son strings
    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).send({
            error: 'Datos incorrectos. Recuerde enviar usuario y contraseña'
        });
    }
    // Busca al usuario en el array users por su username
    const user = users.find(user => user.username === username);
    // Si el usuario no existe, retorna un error 401 (No autorizado)
    if (!user) {
        return res.status(401).send({
            error: 'Usuario y/o password incorrectos'
        });
    }
    // Verifica si la contraseña enviada coincide con la contraseña almacenada del usuario
    if (!(await checkPassword(password, user.password))) {
        return res.status(401).send({
            error: 'Usuario y/o password incorrectos'
        });
    }
    // Genera un token aleatorio para el usuario
    user.token = randomBytes(48).toString('hex');
    // Retorna la información del usuario junto con el token
    res.send({
        username: user.username,
        name: user.name,
        token: user.token
    });
});

// Ruta para cerrar sesión
router.post('/api/logout', authMiddleware, (req, res) => {
    const token = req.get('x-authorization'); // Obtiene el token del encabezado de la solicitud
    const deslog = logout(token); // Llama a la función logout pasando el token como argumento
    // Si el usuario fue deslogueado exitosamente, retorna un status 204 (Sin contenido)
    if (deslog) {
        return res.status(204).send();
    } else {
        // Si no se pudo desloguear al usuario, retorna un error 404 (No encontrado)
        return res.status(404).send();
    }
});

export default router; // Exporta el router para su uso en otros archivos
