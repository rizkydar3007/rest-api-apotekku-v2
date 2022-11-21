const Sequelize = require("sequelize");
const db = require("../database/mysql");
const category = require("./category");
const storage = require("./storage");
const supplier = require("./supplier");
const unit = require("./unit");

var medicene = db.define(
  "medicene",
  {
    idMedicene: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    namaObat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    unitId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    storageId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tglKadaluarsa: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    hargaBeli: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    supplierId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    hargaJual: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    keterangan: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

medicene.hasOne(category, { foreignKey: "categoryId" });
medicene.belongsTo(category, { foreignKey: "categoryId" });
medicene.hasOne(storage, { foreignKey: "storageId" });
medicene.belongsTo(storage, { foreignKey: "storageId" });
medicene.hasOne(supplier, { foreignKey: "supplierId" });
medicene.belongsTo(supplier, { foreignKey: "supplierId" });
medicene.hasOne(unit, { foreignKey: "unitId" });
medicene.belongsTo(unit, { foreignKey: "unitId" });


medicene.removeAttribute("id");
module.exports = medicene;
