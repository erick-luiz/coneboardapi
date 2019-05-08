const express = require('express')
const router = express.Router()

const winnerMonthController = require("../controllers/WinnerMonth.controller")

router.get("/", winnerMonthController.getAll)
router.post("/add", winnerMonthController.addWinnerMonth)

module.exports = router