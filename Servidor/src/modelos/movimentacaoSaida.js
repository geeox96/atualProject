const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovimentacaoSaidaSchema = new Schema({
    idUsuario: {
        type: String
    },
    valor: {
        type: Number
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('MovimentacaoSaida', MovimentacaoSaidaSchema)