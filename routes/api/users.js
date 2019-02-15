const mongoose = require('mongoose')
const router = require('express').Router() 
const passport = require('passport')
const auth = require('../auth')
const User = mongoose.model('Users')

router.post('/', auth.optional, (req, res, err) => {
    const {body : {user}} = req 

    if(!user.email){
        return res.status(422).json({
            errors:{
                email:'is require'
            }
        })
    }
    if(!user.password){
        return res.status(422).json({
            errors:{
                password:'is require'
            }
        })
    }

    const finalUser = new User(user);
    
    finalUser.setPassword(user.password)

    return finalUser.save().then(() => res.json({user: finalUser.toAuthJson()}))
})

router.post('/login', auth.optional, (req, res, err) => {
    
    const {body : {user}} = req 

    if(!user.email){
        return res.status(422).json({
            errors:{
                email:'is require'
            }
        })
    }
    if(!user.password){
        return res.status(422).json({
            errors:{
                password:'is require'
            }
        })
    }


    return passport.authenticate('local', {session:false}, (err, passportUser, info) => {
        if(err) return webkitConvertPointFromNodeToPage(err)

        if(passportUser){
            const user = passportUser
            user.token = passport.generateJWT()
            
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