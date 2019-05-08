const mongoose = require('mongoose')
const router = require('express').Router() 
const passport = require('passport')
const auth = require('../auth')
const User = mongoose.model('Users')

// Serviço de cadastro de usuário
router.post('/', auth.optional, (req, res, err) => {

    const {body : {user}} = req

    if(!user){ return res.status(422).json({ errors:{ user:'is require' } }) }

    let requeridFields = [];
    if(!user.email) requeridFields.push('email')
    if(!user.password) requeridFields.push('password')
    if(!user.passwordConfirmation) requeridFields.push('passwordConfirmation')
    if(!user.name) requeridFields.push('name')
    if(!user.nickName) requeridFields.push('nickName')

    if(requeridFields.length > 0) {
        return res.status(422).json({ errors:{ requeridFields: requeridFields } }) 
    }

    if(user.password !== user.passwordConfirmation || user.password.length < 6) {
        return res.status(422).json({ errors:{ "password":"passwordConfirmation is not valid!" } }) 
    }

    const finalUser = new User(user);
    
    finalUser.setPassword(user.password)
    return finalUser.save().then(
        () => res.json({user: finalUser.toAuthJson()}),
        (err) => res.json({"erro": err}));
})

// serviço de login 
router.post('/login', auth.optional, (req, res, next) => {
    
    const {body : {user}} = req

    let requeridFields = [];
    if(!user.email) requeridFields.push('email')
    if(!user.password) requeridFields.push('password')
    
    if(requeridFields.length > 0) {
        return res.status(422).json({ errors:{ requeridFields: requeridFields } }) 
    }

    return passport.authenticate('local', {session:false}, (err, passportUser, info) => {
        if(err) return next(err)
        
        if(passportUser){
            const user = passportUser
            user.token = passportUser.generateJWT()
            return res.json({user: user.toAuthJson()})
        }
        return res.status(400).info
    })(req, res, next)
})

router.get('/current', auth.require, (req, res, net) => {
    const {payload : {id}} = req

    return User.findById(id)
    .then(user => {
        
        if(!user) return res.sendStatus(400)
        res.json({user:user.toAuthJson()})

    })
})

module.exports = router