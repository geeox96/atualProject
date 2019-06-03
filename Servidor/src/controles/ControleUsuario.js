const mongoose = require('mongoose')
const Usuarios = require('../modelos/usuario')
const MovimentacaoEntrada = require('../modelos/movimentacaoEntrada')
const MovimentacaoSaida = require('../modelos/movimentacaoSaida')
const bcrypt = require('bcrypt')

module.exports = {
    async novo(req, res) {
        const email = req.body.email

        if (await Usuarios.findOne({email})) return res.status(400).send('Erro, E-mail cadastrado')

        const usuario = await Usuarios.create(req.body)

        return res.status(201).json(usuario)
    },
    async editarSenha(req, res) {
        const id = req.params.id

        if (!await Usuarios.findOne({_id: id})) return res.status(400).send('Erro, ID não encontrado')

        await Usuarios.findOneAndUpdate({_id: id}, { $set: { senha: bcrypt.hashSync(req.body.senha, bcrypt.genSaltSync(10), null) } })

        
        return res.send('Senha alterada com sucesso !')
    },
    async editarNome(req, res) {
        const id = req.params.id

        if (!await Usuarios.findOne({_id: id})) return res.status(400).send('Erro, ID não encontrado')

        await Usuarios.findOneAndUpdate({ _id: id }, {$set: { nome: req.body.nome } })

        return res.send('Nome alterado com sucesso !')
    },
    async apagar(req, res) {
        const id = req.params.id

        if (!await Usuarios.findOne({_id: id})) return res.status(400).send('Erro, ID não encontrado')

        await Usuarios.findOneAndDelete({_id: id})
        await MovimentacaoEntrada.findOneAndDelete({idUsuario: id})
        await MovimentacaoSaida.findOneAndDelete({idUsuario: id})

        return res.send('Usuario deletado com sucesso !')
    },
    async inicio(req, res) {
        const usuario = await Usuarios.find()

        return res.json(usuario)
    }
}