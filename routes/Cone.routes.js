const express = require('express')
const router = express.Router()

const coneController = require("../controllers/Cone.controller")

router.post("/create", coneController.create)
router.post("/test", coneController.test)
//router.get("/:id", productController.findProduct)
//router.delete("/:id/delete", productController.remove)
//router.put("/:id/update", productController.update)

router.use((req, res, err) => {
    console.log("Deu pau mano !")
    res.send('error :/')
})

module.exports = router