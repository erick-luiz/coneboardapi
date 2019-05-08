const mongoose = require('mongoose')
const Schema = mongoose.Schema

let PointSchema = new Schema({
	title: { type: String, require: true},
    description: { type: String, require: true},
    author: { type: String, require: true}, 
    date: { type: Date, default: Date.now }, 
    star: { type: Boolean, default: false },
    likes: [{ type: String}],
    dislikes:[{ type: String}]
})

mongoose.model('Point', PointSchema)