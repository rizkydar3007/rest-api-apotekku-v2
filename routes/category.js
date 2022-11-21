const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.category.listCategory);
router.get("/:categoryId", controller.category.detailCategory);
router.post("/", controller.category.createCategory);
router.put("/:categoryId", controller.category.updateCategory);
router.delete("/:categoryId", controller.category.deleteCategory);

module.exports = router;
