const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.unit.listUnit);
router.get("/:unitId", controller.unit.detailUnit);
router.post("/", controller.unit.createUnit);
router.put("/:unitId", controller.unit.updateUnit);
router.delete("/:unitId", controller.unit.deleteUnit);

module.exports = router;
