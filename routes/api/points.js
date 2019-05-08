const mongoose = require('mongoose')
const router = require('express').Router() 
const passport = require('passport')
const auth = require('../auth')
const User = mongoose.model('Users')
const Board = mongoose.model('Board')
const Point = mongoose.model('Point')

router.get('/all', auth.require, (req, res, net) => {
    const {payload : {id}} = req

    return Board.find()
    .then(boards => {
        
        if(!boards) return res.sendStatus(400)
        res.status(200).json({"boards":boards})

    })
})

router.post('/', auth.require, (req, res, net) => {
    
    const {payload : {id}} = req
    const {body : {point}} = req


    if(!point){ return res.status(422).json({ errors:{ point:'is require' } }) }

    let requeridFields = [];
    if(!point.title) requeridFields.push('title')
    if(!point.description) requeridFields.push('description')
    if(!id) requeridFields.push('author')

    if(requeridFields.length > 0) {
        return res.status(422).json({ errors:{ requeridFields: requeridFields } }) 
    }

    const finalPoint = new Point(point);
    finalPoint.author = id;

    const user = User.find({"_id":id});
    
    if(!user.points) user.points = []
    
    let save = false;
    finalPoint.save().then(save => s = true)

    user.points.push(finalPoint);
    return User.findOneAndUpdate(
        {"_id": id},
        { $set: {"points" : user.points } }
    ).then(
        () => res.json({"point": finalPoint}),
        (err) => res.json({"erro": err}));
})

module.exports = router