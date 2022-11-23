const express = require("express")
const buyingController = require("../controller/buying")
const router = express.Router()
const {authAccessToken} = require("../middlewares/auth")

router
    .get("/list-detail", buyingController.listDetailBuying)
    .get("/list-buying", buyingController.listBuying)
    .get("/list-buying/:id", buyingController.listBuyingById)
    .post("/insert", buyingController.insertBuyingAndDetail)


module.exports = router