const express = require("express");
const router = express.Router();
const mediceneRouter = require("./medicene");
const categoryRouter = require("./category");
const storageRouter = require("./storage");
const supplierRouter = require("./supplier");
const unitRouter = require("./unit");

router.use("/medicene", mediceneRouter);
router.use("/category", categoryRouter);
router.use("/storage", storageRouter);
router.use("/supplier", supplierRouter);
router.use("/unit", unitRouter);

module.exports = router;
