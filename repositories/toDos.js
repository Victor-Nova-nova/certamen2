import { randomUUID } from "node:crypto"; // Importa la función randomUUID del módulo crypto de Node.js

// Array que almacenará todos los todos
export const toDos = [];

// Función para obtener todos los todos
export function gettoDos() {
  return toDos; // Retorna el array de todos
}

// Función para obtener un todo por su ID
export function gettodo(id) {
  return toDos.find((m) => m.id === id) ?? null; // Retorna el todo con el ID proporcionado, si no se encuentra retorna null
}

// Función para crear un nuevo todo
export function createtodo(todo) {
  // Crea un nuevo todo con el título proporcionado, un ID generado aleatoriamente y establece completado como false
  const newtodo = {
    title: todo.title,
    id: randomUUID(), // Genera un ID único aleatorio
    completed: false,
  };
  toDos.push(newtodo); // Agrega el nuevo todo al array de todos
  return newtodo; // Retorna el nuevo todo creado
}

// Función para actualizar un todo existente
export function updatetodo(id, todo) {
  const actualtodo = gettodo(id); // Obtiene el todo existente con el ID proporcionado

  if (!actualtodo) {
    return null; // Si no se encuentra el todo, retorna null
  }

  // Actualiza el título del todo si se proporciona un nuevo título
  if (todo.title !== undefined) {
    actualtodo.title = todo.title;
  }

  // Actualiza el estado de completado del todo si se proporciona
  if (todo.completed !== undefined) {
    actualtodo.completed = todo.completed;
  }

  return actualtodo; // Retorna el todo actualizado
}

// Función para eliminar un todo
export function deletetodo(id) {
  const index = toDos.findIndex((m) => m.id === id); // Busca el índice del todo con el ID proporcionado en el array de todos

  if (index === -1) {
    return false; // Si no se encuentra el todo, retorna false
  }

  toDos.splice(index, 1); // Elimina el todo del array de todos
  return true; // Retorna true indicando que se eliminó el todo con éxito
}
