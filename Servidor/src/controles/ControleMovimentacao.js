const mongoose = require('mongoose')
const MovimentacaoEntrada = require('../modelos/movimentacaoEntrada')
const MovimentacaoSaida = require('../modelos/movimentacaoSaida')


module.exports = {
    async novaEntrada(req, res) {
        const entrada = await MovimentacaoEntrada.create(req.body)

        return res.status(201).json(entrada)
    },
    async novaSaida(req, res) {
        const saida = await MovimentacaoSaida.create(req.body)

        return res.status(201).json(saida)
    },
    async inicioEntrada(req, res) {
        const movimentacao = await (MovimentacaoEntrada.find())


        return res.json(movimentacao)
    },
    async inicioSaida(req, res) {
        const movimentacao = await (MovimentacaoSaida.find())


        return res.json(movimentacao)
    }
}