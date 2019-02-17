const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get("/fixedCones", (req, res) => {
    let data = require(__dirname + '/data3.json')
    res.send(data) 
});

router.post("/addPoint", (req, res) => {
    const {body} = req
    let data = require('./data.json')

    const {apelido} = body
 
    cones = getCone(data, apelido)
    cone = cones[0]
    
    const {conisse} = body
    addConisse(cone, conisse)
    res.send(conisse)
    data.cones.forEach(cone => {
        if(cone.apelido == apelido){
            addConisse(cone, conisse)
        }
    });
    
    registerData(data)
    res.send(cone)
});

let getCone = (data, apelido) => {
    const {cones} = data
    return cones.filter(cone => cone.apelido == apelido);
}

let addConisse = (cone, conisse) => {cone.conisses.push(conisse)}

let registerData = (newData) => {
    fs.readFile(__dirname + '/data3.json', (err, data) => {
        var json = JSON.stringify(newData); 
        fs.writeFile(__dirname + '/data3.json', json); 
    });
}

router.use((req, res, err) => {
    console.log("Errors")
    res.send('Errou :/')
})

module.exports = router