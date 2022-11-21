const medicene = require("./medicene");
const category = require("./category");
const storage = require("./storage");
const supplier = require("./supplier");
const unit = require("./unit");
const controller = {};

controller.medicene = medicene;
controller.category = category;
controller.storage = storage;
controller.supplier = supplier;
controller.unit = unit;
module.exports = controller;
