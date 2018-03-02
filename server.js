const express = require('express')
const bodyParser = require('body-parser')
// const port = 3000
var formidable = require('express-formidable'); //para tratar os parametros que chegam por post
const app = express() //usando a biblioteca express para usar Router()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('port', (process.env.PORT || 5000));
// app.use(formidable());
app.use(express.static(__dirname + '/public'));

let arduinoRoutes = require('./routes/arduinoRoutes')
let mobileRoutes = require('./routes/mobileRoutes')
let mongo = require('./drivers/mongodb')

app.use("/", arduinoRoutes)
app.use("/", mobileRoutes)

app.listen(app.get('port'), () => {
    console.log(`Servidor rodando em http://localhost:${app.get('port')}`)
    console.log('Para derrubar o servidor: ctrl + c');
})