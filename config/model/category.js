const Sequelize = require("sequelize");
const db = require("../database/mysql");

var category = db.define(
  "category",
  {
    categoryId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    nameCategory: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

category.removeAttribute("id");
module.exports = category;
