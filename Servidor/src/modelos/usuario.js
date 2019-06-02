const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
    },
})

UsuarioSchema.pre('save', async function (next) {
    let usuario = this
    if (!usuario.isModified('senha')) return next()

    usuario.senha = await bcrypt.hash(usuario.senha, 10)
    return next()
})


module.exports = mongoose.model('Usuario', UsuarioSchema)