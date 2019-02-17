const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ConeSchema = new Schema({
    name:{type: String, require: true, max:100}, 
    nickname:{type: String, require: true, max:100, unique: true}, 
    img: {type: String, require: true, default: "img.jpg"},
    points: [{
        title: String,
        description: String, 
        date: { type: Date, default: Date.now }, 
        star: { type: Boolean, default: false } 
    }]
})

ConeSchema.query.byNikename = function(nk) {
    return this.where({ nikename: new RegExp(nk, 'i') });
};

module.exports = mongoose.model('Cone', ConeSchema)