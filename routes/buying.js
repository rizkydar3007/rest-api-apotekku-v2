const express = require("express")
const buyingController = require("../controller/buying")
const router = express.Router()
const {authAccessToken} = require("../middlewares/auth")

router
    .get("/list-detail", authAccessToken, buyingController.listDetailBuying)
    .get("/list-buying", authAccessToken, buyingController.listBuying)
    .get("/list-buying/:id", authAccessToken, buyingController.listBuyingById)
    .post("/insert", authAccessToken, buyingController.insertBuyingAndDetail)

module.exports = router