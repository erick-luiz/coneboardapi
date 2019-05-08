const mongoose = require('mongoose')
const crypto   = require('crypto')
const jwt      = require('jsonwebtoken')

const {Schema} = mongoose

const UserSchema = new Schema(
    {
        name: {type: String, require: true, max:30}, 
        nickName: {type: String, require: true, max:30},
        email: {type: String, require: true, max:100, unique: true}, 
        hash: String, 
        salt: String,
        img: String, 
        points: [{ type: Schema.Types.ObjectId, ref: 'Point' }]
    }
)

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512,'sha512').toString('hex')
}

UserSchema.methods.validade = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512,'sha512').toString('hex')
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