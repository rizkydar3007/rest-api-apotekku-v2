const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const {authAccessToken} = require("../middlewares/auth")

router.get("/", authAccessToken, controller.medicene.listMedicene);
router.get("/:idMedicene", authAccessToken, controller.medicene.detailMedicene);
router.post("/", authAccessToken, controller.medicene.createMedicene);
router.put("/:idMedicene", authAccessToken, controller.medicene.updateMedicene);
router.delete("/:idMedicene", authAccessToken, controller.medicene.deleteMedicene);

module.exports = router;
