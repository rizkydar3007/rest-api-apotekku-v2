const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.storage.listStorage);
router.get("/:storageId", controller.storage.detailStorage);
router.post("/", controller.storage.createStorage);
router.put("/:storageId", controller.storage.updateStorage);
router.delete("/:storageId", controller.storage.deleteStorage);

module.exports = router;
