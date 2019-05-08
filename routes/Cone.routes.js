const express = require('express')
const router = express.Router()

const coneController = require("../controllers/Cone.controller")

router.get("/winnerMonth", coneController.getAllWinner)

router.get("/", coneController.getAll)
router.post("/create", coneController.create)
router.post("/:nikename/addPoint", coneController.addPoint)
router.get("/:id", coneController.getCone)

router.post("/winnerMonth/add", coneController.addWinnerMonth)

module.exports = router