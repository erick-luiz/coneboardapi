const express = require('express')
const router = express.Router()

const coneController = require("../controllers/Cone.controller")

router.get("/", coneController.getAll)
router.post("/create", coneController.create)
router.post("/:nikename/addPoint", coneController.addPoint)
router.get("/:id", coneController.getCone)


router.get("/test", (req, res) => {
    
    res.send("Teste da API" + process.env.chave) 
});

//router.get("/:id", productController.findProduct)
//router.delete("/:id/delete", productController.remove)
//router.put("/:id/update", productController.update)

router.use((req, res, err) => {
    console.log("Errors")
    res.send('error :/')
})

module.exports = router