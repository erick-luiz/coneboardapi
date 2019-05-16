const mongoose = require('mongoose')
const router = require('express').Router() 
const passport = require('passport')
const auth = require('../auth')
const User = mongoose.model('Users')
const Board = mongoose.model('Board')

router.get('/boards', auth.require, (req, res, net) => {
    const {payload : {id}} = req

    return Board.find()
    .then(boards => {
        
        if(!boards) return res.sendStatus(400)
        res.status(200).json({"boards":boards})

    })
})

router.post('/', auth.require, (req, res, net) => {
    
    const {payload : {id}} = req
    const {body : {board}} = req

    if(!board){ return res.status(422).json({ errors:{ board:'is require' } }) }

    let requeridFields = [];
    if(!board.name) requeridFields.push('name')
    if(!board.img) requeridFields.push('img')
    if(!id) requeridFields.push('id')

    if(requeridFields.length > 0) {
        return res.status(422).json({ errors:{ requeridFields: requeridFields } }) 
    }

    board.idUser = id;

    const finalBoard = new Board(board);
    
    return finalBoard.save().then(
        () => res.json({"board": finalBoard}),
        (err) => res.json({"erro": err}));
})

module.exports = router