const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.medicene.listMedicene);
router.get("/:idMedicene", controller.medicene.detailMedicene);
router.post("/", controller.medicene.createMedicene);
router.put("/:idMedicene", controller.medicene.updateMedicene);
router.delete("/:idMedicene", controller.medicene.deleteMedicene);

module.exports = router;
