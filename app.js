const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Cone = require('./routes/Cone.routes')
/*
let dev_db_url = ""
let mongodb = process.env.MONGODB_URI || dev_db_url
mongoose.connect(mongodb)
mongoose.Promise = global.Promise
*/
let db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongo Connect error:'))

app = express() 
// app.use(bodyParser.json)
app.use(bodyParser.urlencoded({extended:false}))
// Rotas 
app.use('/Cone', Cone)

let port = process.env.PORT || 8080
app.listen(port, () => {console.log('Listen port:', port)})