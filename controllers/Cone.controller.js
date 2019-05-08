const Cone = require('../models/Cone')
const WM = require('../models/WinnerMonth')

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
        res.status(500)
        .json({
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
            if(!cone){
                res.status(500)
                .json({
                    error: 500, 
                    message: "Cone não encontrado para adicionar o ponto!"
                }).send()
            }else{
                if(!cone.points) cone.points = [] 
                cone.points.push(pt)
    
                Cone.update({ nickname: nk}, {$set:cone}, function (err, cone) {
                    if(err){
                        res.status(500).json({
                            error: 500, 
                            message: "Erro ao atualizar a pontuacao"
                        }).send()
                    }
                    res.status(200).json({"sucess":"operação realizada com sucesso ;)"}).send()
                })
            }

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

exports.addWinnerMonth = (req, res, next) => {

    let key = req.body.key

    if(key != secretKey){
        res.status(500)
        .json({
            error: 500, 
            message: "Chave de registro invalida!"
        }).send()
    }else{

        let {month, year, points, nk} = req.body.data
        
        let winnerMonth = new WM({
            dateMonth: parseInt(month),
            dateYear: parseInt(year), 
            points: parseInt(points),
            cones: [] 
        });


        Cone.findOne({ nickname: nk}, function (err, cone) {
            if(!cone){
                res.status(500)
                .json({
                    error: 500, 
                    message: "Cone não encontrado para cadastrar como vencedor!"
                }).send()
            }else{

                winnerMonth.cones.push(cone);
                
                winnerMonth.save(function(err, winnerMonth) {
                    if(err) res.status(500).send({
                        error: 500, 
                        message: "Problema ao cadastrar o vencedor do mês :/!"
                    })
            
                   res.status(200).send(winnerMonth) 
                })
            }

        });
    }
}

exports.getAllWinner = (req, res) => {

    WM.find({}, (err, winnersMonth) => {
        res.send({"winnersCones": winnersMonth})
    });
}