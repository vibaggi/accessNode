const express = require('express')
const port = 3000
var formidable = require('express-formidable'); //para tratar os parametros que chegam por post
const app = express() //usando a biblioteca express para usar Router()
app.use(formidable());
let arduinoRoutes = require('./routes/arduinoRoutes')
let mongo = require('./drivers/mongodb')

app.use("/", arduinoRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
    console.log('Para derrubar o servidor: ctrl + c');
})