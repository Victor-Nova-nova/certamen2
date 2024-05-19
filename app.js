import express from 'express'
import controllerToDos from './controllers/toDos.js'
import controllerUsuario from './controllers/autenticacion.js'
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use('/', controllerToDos);
app.use('/', controllerUsuario);

app.get('/api', (req, res) => {
	res.type('text/plain')
	res.end('Hello World!')
})

// ... hasta aquí

export default app