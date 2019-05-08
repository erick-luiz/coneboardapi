const WinnerMonth = require('../models/WinnerMonth')
const Cone = require('../models/Cone')

if(process.env.isPrd) {
    require('../config/keys.config')
}else{
    require('../config/keys.config.local')
}

exports.addWinnerMonth = (req, res, next) => {

    res.status(200).json({nome: "erick teste"}).send()
    
    let key = req.body.key
    
    console.log(key)

    if(key != secretKey){
        res.status(500)
        .json({
            error: 500, 
            message: "Chave de registro invalida!"
        }).send()
    }else{

        // let nk = req.params.nikename
        
        let {month, year, points, nk} = req.body.data
        
        let winnerMonth = {
            dateMonth: parseInt(month),
            dateYear: parseInt(year), 
            points: parseInt(points),
            cones: [] 
        };


        Cone.findOne({ nickname: nk}, function (err, cone) {
            if(!cone){
                res.status(500)
                .json({
                    error: 500, 
                    message: "Cone não encontrado para adicionar o ponto!"
                }).send()
            }else{
                winnerMonth.cones.push(cone);
                WinnerMonth.save((err, winnerMonth)=>{
                    if(err) res.status(500).send({
                        error: 500, 
                        message: "nikename do cone já cadastrado :/!"
                    })
            
                   res.status(200).send(winnerMonth) 
                })
            }

        });
    }
}

exports.getAll = (req, res) => {
    res.status(200).json({nome: "erick teste"}).send()
    WinnerMonth.find({}, (err, winnersMonth) => {
        res.send({"cones": winnersMonth})
    });
}