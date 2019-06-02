const mongoose = require('mongoose')
const Usuarios = require('../modelos/usuario')

module.exports = {
    async novo(req, res) {
        const email = req.body.email

        if (await Usuarios.findOne({email})) return res.status(400).send('Erro, E-mail cadastrado')

        const usuario = await Usuarios.create(req.body)

        return res.status(201).json(usuario)
    },

    async editar(req, res) {
        const { nome, senha } = req.body

        if ( !nome ) {
            
        }else if ( !senha ){

        }else {

        }
    },

    async apagar(req, res) {
        await Usuario.findByIdAndDelete(req.params.id)

        return res.send('Deletado com sucesso !')
    },
    async inicio(req, res) {
        const usuario = await Usuarios.find()

        return res.json(usuario)
    }
}