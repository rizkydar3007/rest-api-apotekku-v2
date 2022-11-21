const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.supplier.listSupplier);
router.get("/:supplierId", controller.supplier.detailSupplier);
router.post("/", controller.supplier.createSupplier);
router.put("/:supplierId", controller.supplier.updateSupplier);
router.delete("/:supplierId", controller.supplier.deleteSupplier);

module.exports = router;
