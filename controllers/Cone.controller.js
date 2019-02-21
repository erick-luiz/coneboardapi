const Cone = require('../models/Cone')

if(process.env.isPrd) {
    require('../config/keys.config')
}else{
    require('../config/keys.config.local')
}

exports.create = (req, res, next) => {

    let key = req.body.key
    if(key != secretKey){
        res.status(500).send({
            error: 500, 
            message: "Chave de registro invalida!"
        })
        return;
    }

    let name     = req.body.data.name
    let nickname = req.body.data.nickname
    let img      = req.body.data.img

    let cone = new Cone({
        name: name, 
        nickname: nickname, 
        img: img, 
        points: []
    })

    cone.save((err, cone)=>{
        if(err) res.status(500).send({
            error: 500, 
            message: "nikename do cone já cadastrado :/!"
        })

       res.status(200).send(cone) 
    })
}

exports.addPoint = (req, res, next) => {

    let key = req.body.key
    
    if(key != secretKey){
        res.status(500).json({
            error: 500, 
            message: "Chave de registro invalida!"
        }).send()
    }else{

        
        let nk = req.params.nikename
        
        let {data, titulo, descricao, estrelado} = req.body.data
        
        let pt = {
            title: titulo,
            description: descricao, 
            date: data, 
            star: estrelado 
        };


        Cone.findOne({ nickname: nk}, function (err, cone) {
            if(!cone) res.status(500).json({
                error: 500, 
                message: "Cone não encontrado para adicionar o ponto!"
            }).send()

            if(!cone.points) cone.points = [] 
            cone.points.push(pt)

            Cone.update({ nickname: nk}, {$set:cone}, function (err, cone) {
                if(err) res.status(500).json({
                    error: 500, 
                    message: "Erro ao atualizar a pontuação"
                }).send()
                res.status(200).send("Operação realizada com suceeso")
            })
        });
    }
}

exports.getCone = (req, res) => { 

    let nk = req.params.nk

    Cone.findOne({ nickname: nk}, function (err, cone) {
        if(!cone) res.status(500).json({
            error: 500, 
            message: "Cone não encontrado"
        }).send()
        res.send(cone)
    });

}

exports.getAll = (req, res) => {
    
    Cone.find({}, (err, cones) => {
        res.send({"cones":cones})
    });
}

exports.remove = (req, res) => {
    
    // res.send("Teste da API" + process.env.chave) 
}

exports.update = (req, res) => {
    
    // res.send("Teste da API" + process.env.chave) 
}

/*
const Product = require('../models/Product')

exports.create = function(req, res, next) {
    console.log('aqui')
    let product = new Product({
        name: req.body.name, 
        price: req.body.price
    })

    product.save((error, prod)=>{
       if(error) return next(error)
       res.send(prod) 
    })
}

exports.findProduct = function(req, res, next) {
    Product.findById(req.params.id, function(err, product){
        if(err){
            next()
            //res.send('error :/')
        }
        res.send(product)
    })
}

exports.update = function(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, prod) =>{
        console.log(req.params.id)
        if(err) return next(err)
        res.send("Produto atualizado com sucesso!")
    })
}

exports.remove = function(req, res, next) {
    Product.findByIdAndDelete(req.param.id, (err, prod) => {
        if(err) next()
        res.send('Produto removido com sucesso!')
    })
}  
*/