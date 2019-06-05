const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const config = require('./config')



//mongoose
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true, useFindAndModify: false }
mongoose.connect(config.dev.url, options)
mongoose.set('useCreateIndex', true)
mongoose.connection.on('error', (err) => {
    console.log('Erro no banco ' + err)
})
mongoose.connection.on('connected', () => {
    console.log('MongoDB conectado')
})

//body-parses
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//iniciação app
app.listen(config.dev.port, () => {
    console.log(`API executando na porta ${config.dev.port}`)
})

module.exports = app;

app.use(cors())
//ROTAS
app.use('/api', require('./src/rotas/usuario'))
app.use('/api', require('./src/rotas/movimentacao'))


