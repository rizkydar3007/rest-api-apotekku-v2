const express = require("express")
const sellingController = require("../controller/selling")
const router = express.Router()
const {authAccessToken} = require("../middlewares/auth")

router
    .get("/list-detail", authAccessToken, sellingController.listDetailSelling)
    .get("/list-selling", authAccessToken, sellingController.listSelling)
    .get("/list-selling/:id", authAccessToken, sellingController.listSellingById)
    .post("/insert", authAccessToken, sellingController.insertSellingAndDetail)

module.exports = router