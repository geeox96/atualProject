const express = require('express')
const rotas = express.Router()
const ControleUsuarios = require('../controles/ControleUsuario')

rotas.post('/usuario', ControleUsuarios.new)

module.exports = rotas