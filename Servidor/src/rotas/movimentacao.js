const express = require('express')
const rotas = express.Router()
const ControleMovimentacao = require('../controles/ControleMovimentacao')

rotas.post('/movimentacao/entrada',  ControleMovimentacao.novaEntrada)
rotas.post('/movimentacao/saida',  ControleMovimentacao.novaSaida)
rotas.get('/movimentacao/entrada', ControleMovimentacao.inicioEntrada)
rotas.get('/movimentacao/saida', ControleMovimentacao.inicioSaida)

module.exports = rotas