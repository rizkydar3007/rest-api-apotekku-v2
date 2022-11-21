const Sequelize = require("sequelize");
const db = require("../database/mysql");

var storage = db.define(
  "storage",
  {
    storageId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    nameStorage: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

storage.removeAttribute("id");
module.exports = storage;
