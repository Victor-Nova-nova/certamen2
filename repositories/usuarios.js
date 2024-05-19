import { scrypt, randomBytes } from 'node:crypto'; // Importa las funciones scrypt y randomBytes del módulo crypto de Node.js

// Array de usuarios con sus credenciales
export const users = [
	{
		username: 'admin',
		name: 'Gustavo Alfredo Marín Sáez',
		password: '1b6ce880ac388eb7fcb6bcaf95e20083:341dfbbe86013c940c8e898b437aa82fe575876f2946a2ad744a0c51501c7dfe6d7e5a31c58d2adc7a7dc4b87927594275ca235276accc9f628697a4c00b4e01' // La contraseña es 'certamen123'
	},
	{
		username: 'user',
		name: 'Gandalf',
		password: 'cc46a0a0a1320b7dd69fe26c288c9f32:bcd6c1505c8973be89c75d24184ecb9a2edb54913a18e955cfdd5a65eb63f933d2ad15acceebeccea494f4481522a074e1d60d0d58ab8ecad380988ee8ec7684' // La contraseña es 'password123'
	}
]

// Función para verificar la contraseña
export function checkPassword(password, hash) {
	const [salt, key] = hash.split(':'); // Divide el hash almacenado en la base de datos en sal y clave

	return new Promise((resolve) => {
		scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) {
				return resolve(false); // Si hay un error, resuelve false
			}
			resolve(derivedKey.toString('hex') === key); // Compara la clave derivada con la clave almacenada y resuelve true o false
		})
	})
}

// Función para iniciar sesión
export async function login(username, password) {
	const user = users.find(user => user.username === username); // Busca al usuario por nombre de usuario
	if (!user) {
		throw new Error("Usuario y/o password incorrectos"); // Si el usuario no existe, lanza un error
	}
	if (!(await checkPassword(password, user.password))) {
		throw new Error("Usuario y/o password incorrectos"); // Si la contraseña no coincide, lanza un error
	}
	user.token = randomBytes(48).toString('hex'); // Genera un token aleatorio y lo asigna al usuario
	return {
		username: user.username,
		name: user.name,
		token: user.token
	}; // Retorna la información del usuario junto con el token
}

// Función para cerrar sesión
export function logout(token) {
	const user = users.find(user => user.token === token); // Busca al usuario por token
	if (user) {
		delete user.token; // Elimina el token del usuario
		return true; // Si se encuentra y elimina el token, retorna true
	} else {
		return false; // Si el usuario no se encuentra, retorna false
	}
}
