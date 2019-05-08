const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const cors = require('cors')

mongoose.Promise = global.Promise

app = express() 
// Configurando a aplicação 
app.use(cors())
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));



// Banco de dados
if(process.env.isPrd) {
    require('./config/db.config')
}else{
    require('./config/db.config.local')
}
let dev_db_url = "mongodb://" + dbuser + ":" + dbpassword + "@" + dbhost+"/" + dbname
let mongodb = process.env.MONGODB_URI || dev_db_url
mongoose.connect(mongodb)
mongoose.Promise = global.Promise

let db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongo Connect error:'))

// Rotas e Modelos 
const Cone = require('./routes/Cone.routes')

require('./models/models.require')
require('./config/passport')

app.use('/Cone', Cone)
app.use(require('./routes'))

require('./Schedule/startSchedules')


let port = process.env.PORT || 8080
app.listen(port, () => {console.log('Listen port:', port)})