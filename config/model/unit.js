const Sequelize = require("sequelize");
const db = require("../database/mysql");

var unit = db.define(
  "unit",
  {
    unitId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    nameUnit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

unit.removeAttribute("id");
module.exports = unit;
