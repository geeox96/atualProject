const express = require('express')
const rotas = express.Router()
const ControleUsuarios = require('../controles/ControleUsuario')

rotas.post('/usuario', ControleUsuarios.novo)
rotas.put('/usuario/:id', ControleUsuarios.editar)
rotas.delete('/usuario/:id', ControleUsuarios.apagar)
rotas.get('/usuario', ControleUsuarios.inicio)

module.exports = rotas