const express = require("express");
const router = express.Router();
const mediceneRouter = require("./medicene");
const categoryRouter = require("./category");
const storageRouter = require("./storage");
const supplierRouter = require("./supplier");
const unitRouter = require("./unit");
const buyingRouter = require("./buying");
const sellingRouter = require("./selling");
const usersRouter = require("./users");

router.use("/medicene", mediceneRouter);
router.use("/category", categoryRouter);
router.use("/storage", storageRouter);
router.use("/supplier", supplierRouter);
router.use("/unit", unitRouter);
router.use("/users", usersRouter);
router.use("/selling", sellingRouter);
router.use("/buying", buyingRouter);

module.exports = router;
