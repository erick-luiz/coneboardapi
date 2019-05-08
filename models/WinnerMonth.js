const mongoose = require('mongoose')
const Schema = mongoose.Schema

let WinnerMonthSchema = new Schema({
    cones: [{ type: Schema.Types.ObjectId, ref: 'Cone' }],
    points: {type: Number},
    dateMonth: { type: Number, min:1, max: 12},
    dateYear: { type: Number, default:2019}
})

module.exports = mongoose.model('WinnerMonth', WinnerMonthSchema)