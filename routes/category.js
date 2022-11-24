const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const {authAccessToken} = require("../middlewares/auth")

router.get("/", authAccessToken, controller.category.listCategory);
router.get("/:categoryId", authAccessToken, controller.category.detailCategory);
router.post("/", authAccessToken, controller.category.createCategory);
router.put("/:categoryId", authAccessToken, controller.category.updateCategory);
router.delete("/:categoryId", authAccessToken, controller.category.deleteCategory);

module.exports = router;
