require("dotenv").config();
var Sequelize = require("sequelize");
const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_NAME, DB_DIALECT } = process.env;
var db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOSTNAME,
});

(async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = db;
