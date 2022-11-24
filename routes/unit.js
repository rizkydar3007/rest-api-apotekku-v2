const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const {authAccessToken} = require("../middlewares/auth")

router.get("/", authAccessToken, controller.unit.listUnit);
router.get("/:unitId", authAccessToken, controller.unit.detailUnit);
router.post("/", authAccessToken, controller.unit.createUnit);
router.put("/:unitId", authAccessToken, controller.unit.updateUnit);
router.delete("/:unitId",authAccessToken, controller.unit.deleteUnit);

module.exports = router;
