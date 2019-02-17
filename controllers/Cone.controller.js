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

    cone.save((err, cone)=>{
       if(err) res.status(500).send("error: nikename do cone já cadastrado :/ ")
       res.status(200).send(cone) 
    })
}

exports.addPoint = (req, res, next) => {

    let nk = req.params.nikename

    let {data, titulo, descricao, estrelado} = req.body

    let pt = {
        title: titulo,
        description: descricao, 
        date: data, 
        star: estrelado 
    };


    Cone.findOne({ nickname: nk}, function (err, cone) {
        if(!cone) res.send("Cone não encontrado para adicionar o potno")

        if(!cone.points) cone.points = [] 
        cone.points.push(pt)

        Cone.update({ nickname: nk}, {$set:cone}, function (err, cone) {
            if(err) res.status(500).send("Erro ao atualizar a pontuação");
            res.send(cone)
        })
    });
}

exports.tesat = (req, res) => {
    
    res.send("Teste da API" + process.env.chave) 
}
exports.getCone = (req, res) => { 

    let id = req.params.id

    Cone.findOne({ nickname: 'ericone'}, function (err, cone) {
        if(!cone) res.send("Cone não encontrado")
        res.send(cone)
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