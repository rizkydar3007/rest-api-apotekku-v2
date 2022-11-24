const Sequelize = require("sequelize");
const db = require("../database/mysql");

var supplier = db.define(
  "supplier",
  {
    supplierId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    nameSupplier: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    alamatSupplier: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

supplier.removeAttribute("id");
module.exports = supplier;
