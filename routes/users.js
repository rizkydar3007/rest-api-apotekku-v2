const express = require("express")
const router = express.Router()
const usersController = require("../controller/users")
const {authAccessToken} = require("../middlewares/auth")

router
    .post("/register", usersController.register)
    .post("/login", usersController.login)
    .post("/refresh-token", usersController.refreshToken)
    .get("/list", authAccessToken, usersController.listUsers)
    // .delete("/logout", usersController.logout)
    // .get("/profile", authAccessToken, usersController.profile)

module.exports = router