const medicene = require("./medicene");
const category = require("./category");
const storage = require("./storage");
const supplier = require("./supplier");
const unit = require("./unit");
const model = {};

model.medicene = medicene;
model.category = category;
model.storage = storage;
model.supplier = supplier;
model.unit = unit;

module.exports = model;
