const Cone = require('../models/Cone')

exports.create = (req, res, next) => {

    let name     = req.body.name
    let nickname = req.body.nickname
    let img      = req.body.img

    let cone = new Cone({
        name: name, 
        nickname: nickname, 
        img: img, 
        points: []
    })

    cone.save((error, cone)=>{
       if(error) return next(error)
       res.send(cone) 
    })
}
exports.test = (req, res) => {
    
    res.send("Teste da API") 
}