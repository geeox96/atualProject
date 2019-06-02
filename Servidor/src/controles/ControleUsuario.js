const mongoose = require('mongoose')
const Usuarios = require('../modelos/usuario')

module.exports = {
    async new(req, res) {
        const usuario = await Usuario.create(req.body)

        return res.json(usuario)
    }
}