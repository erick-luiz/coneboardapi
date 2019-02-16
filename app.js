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


// Rotas e Modelos 
const Cone = require('./routes/Cone.routes')
require('./models/Users')
require('./config/passport')
require('./routes')
//require('./routes/temp/temp')

// Banco de dados 
let dev_db_url = "mongodb://1:2@ds143603.mlab.com:43603/dbconeboard"
let mongodb = process.env.MONGODB_URI || dev_db_url
mongoose.connect(mongodb)
mongoose.Promise = global.Promise

let db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongo Connect error:'))
app.use('/Cone', Cone)
app.use('/temp', require('./routes/temp'))



app.use((req, res, err) => {
    res.status(err.status || 500)
    res.json(
        {
            erros:{
                message: err.message, 
                erros:{}
            }
        }
    )
})

let port = process.env.PORT || 8080
app.listen(port, () => {console.log('Listen port:', port)})