const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ConeSchema = new Schema({
    name:{type: String, require: true, max:100 }, 
    nickname:{type: String, require: true, max:100}, 
    img: {type: String, require: true, default: "img.jpg"},
    points: [{ 
        description: String, 
        date: { type: Date, default: Date.now }, 
        star: { type: Boolean, default: false } 
    }]
})

module.exports = mongoose.model('Cone', ConeSchema)