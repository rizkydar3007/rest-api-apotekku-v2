const express = require("express")
const buyingController = require("../controller/buying")
const router = express.Router()
const {authAccessToken} = require("../middlewares/auth")

router
    .get("/list-detail", authAccessToken, buyingController.listDetailBuying)
    .get("/list-buying", authAccessToken, buyingController.listBuying)
    .get("/list-buying/:id", authAccessToken, buyingController.listBuyingById)
    .post("/insert", authAccessToken, buyingController.insertBuyingAndDetail)
    .get("/search-by-date", authAccessToken, buyingController.searchByBuyingDate)
    .get("/search-by-id", authAccessToken, buyingController.searchByBuyingId)
    .get("/search-by-id-asc", authAccessToken, buyingController.searchByBuyingIdAsc)
    .get("/search-by-id-desc", authAccessToken, buyingController.searchByBuyingIdDesc)


module.exports = router