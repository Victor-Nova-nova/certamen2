import { setLocale } from "yup"; // Importa la función setLocale de Yup para establecer el idioma de las validaciones
import { es } from "yup-locales"; // Importa el archivo de localización en español para Yup
import { object, string, bool } from "yup"; // Importa funciones de validación de Yup

setLocale(es); // Establece el idioma de las validaciones en español utilizando el archivo de localización importado

// Esquema de validación para la creación de un nuevo todo
export const createTodoSchema = object({
  title: string().required().strict(), // El título es una cadena obligatoria
});

// Esquema de validación para la actualización de un todo existente
export const updateTodoSchema = object({
  title: string().optional().strict(), // El título es opcional
  completed: bool().optional().strict(), // El estado de completado es opcional y debe ser un booleano
});

// Esquema de validación para el ID de un todo
export const idTodoSchema = object({
  id: string().required().strict(), // El ID es una cadena obligatoria
});

// Esquema de validación para el inicio de sesión
export const loginSchema = object({
  username: string().required().strict(), // El nombre de usuario es una cadena obligatoria
  password: string().required().strict() // La contraseña es una cadena obligatoria
});
