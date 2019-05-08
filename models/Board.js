const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ConeBoardSchema = new Schema({
    name:{type: String, require: true, max:100, unique: true},
    idUser: {type: String},
    img: {type: String, require: true, default: "img.jpg"},
    cones: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
})

mongoose.model('Board', ConeBoardSchema)