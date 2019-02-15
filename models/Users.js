const mongoose = require('mongoose')
const crypto   = require('crypto')
const jwt      = require('jsonwebtoken')

const {Schema} = mongoose

const UserSchema = new Schema(
    {
        name: String, 
        nickName: String,
        email: String, 
        hash: String, 
        salt: String
    }
)

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2(password, this.salt, 10000, 512,'sha512').toString('hex')
}

UserSchema.methods.validade = function(password){
    const hash = crypto.pbkdf2(password, this.salt, 10000, 512,'sha512').toString('hex')
    return this.hash == hash
}

UserSchema.methods.generateJWT = function(){
    const today = new Date() 
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDay() + 60)
    return jwt.sign({
        email:this.email,
        id:this._id, 
        exp: parseInt(expirationDate.getTime()/1000, 10)
    }, 'secret')
}

UserSchema.methods.toAuthJson = function(){
    return {
        _id: this._id, 
        email: this.email, 
        token: this.token
    }
}

mongoose.model('Users', UserSchema)