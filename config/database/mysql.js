require("dotenv").config();
var Sequelize = require("sequelize");
const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_NAME, DB_DIALECT } = process.env;
var db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOSTNAME,
});

module.exports = db;
