import { Router } from "express"; // Importa el Router de Express
import { gettoDos, createtodo, updatetodo, deletetodo, toDos, gettodo } from "../repositories/toDos.js"; // Importa funciones del archivo toDos.js
import { createTodoSchema, updateTodoSchema } from "../schemas/index.js"; // Importa esquemas de validación
import { authMiddleware } from "../middlewares/middleware.js"; // Importa el middleware de autenticación

const router = new Router(); // Crea un nuevo router de Express

// Rutas para obtener todos los todos y un todo específico
router.get('/api/todos', authMiddleware, (req, res) => { // 1
  res.send(gettoDos()); // Devuelve todos los todos
})

router.get('/api/todos/:id', authMiddleware, (req, res) => { // 1
  const list = gettodo(req.params.id); // Obtiene un todo específico por su ID
  if (list) {
    res.send(list); // Devuelve el todo encontrado
  } else {
    res.status(404).json("Lista no encontrada"); // Si no se encuentra el todo, devuelve un error 404
  }
});

// Ruta para crear un nuevo todo
router.post('/api/todos', authMiddleware, (req, res) => { // 2
  let todo
  try {
    todo = createTodoSchema.validateSync(req.body, { // Valida el cuerpo de la solicitud con el esquema de creación de todo
      stripUnknown: true,
    });
  } catch (ex) {
    return res.status(400).send(ex); // Si la validación falla, devuelve un error 400
  }

  res.status(201).send(createtodo(todo)); // Crea el nuevo todo y devuelve el resultado con un código de estado 201 (Creado)
});

// Ruta para actualizar un todo existente
router.put('/api/todos/:id', authMiddleware, (req, res) => { // actualizacion
  const id = req.params.id; // Obtiene el ID del todo a actualizar
  let validatedtodo;

  try {
    validatedtodo = updateTodoSchema.validateSync(req.body, { // Valida el cuerpo de la solicitud con el esquema de actualización de todo
      stripUnknown: true,
    });
  } catch (ex) {
    return res.status(400).send(ex); // Si la validación falla, devuelve un error 400
  }

  const updatedtodo = updatetodo(id, validatedtodo); // Actualiza el todo con el ID proporcionado

  if (updatedtodo) {
    res.send(updatedtodo); // Devuelve el todo actualizado si se encuentra
  } else {
    res.status(404).json("Lista no encontrada"); // Si no se encuentra el todo, devuelve un error 404
  }
});

// Ruta para eliminar un todo
router.delete('/api/todos/:id', authMiddleware, (req, res) => {
  const id = req.params.id; // Obtiene el ID del todo a eliminar

  if (deletetodo(id)) { // Elimina el todo con el ID proporcionado
    res.status(204).send(); // Devuelve un código de estado 204 (Sin contenido) si se elimina con éxito
  } else {
    res.status(404).json("lista no encontrada"); // Si no se encuentra el todo, devuelve un error 404
  }
});

export default router; // Exporta el router para su uso en otros archivos
