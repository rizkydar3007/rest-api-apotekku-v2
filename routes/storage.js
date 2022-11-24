const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const {authAccessToken} = require("../middlewares/auth")

router.get("/", authAccessToken, controller.storage.listStorage);
router.get("/:storageId", authAccessToken, controller.storage.detailStorage);
router.post("/", authAccessToken, controller.storage.createStorage);
router.put("/:storageId", authAccessToken, controller.storage.updateStorage);
router.delete("/:storageId", authAccessToken, controller.storage.deleteStorage);

module.exports = router;
