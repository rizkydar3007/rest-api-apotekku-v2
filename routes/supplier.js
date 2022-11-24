const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const {authAccessToken} = require("../middlewares/auth")

router.get("/", authAccessToken, controller.supplier.listSupplier);
router.get("/:supplierId", authAccessToken, controller.supplier.detailSupplier);
router.post("/", authAccessToken, controller.supplier.createSupplier);
router.put("/:supplierId", authAccessToken, controller.supplier.updateSupplier);
router.delete("/:supplierId", authAccessToken, controller.supplier.deleteSupplier);

module.exports = router;
