const model = require("../config/model/index");
const controller = {};

controller.listSupplier = async function (req, res) {
  try {
    let supplier = await model.supplier.findAll();
    if (supplier.length > 0) {
      res.json({
        status: 200,
        message: "Get List Supplier",
        data: supplier,
      });
    } else {
      res.json({
        status: 200,
        message: "Cannot Get List Supplier",
        data: [],
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

controller.detailSupplier = async function (req, res) {
  try {
    let supplier = await model.supplier.findAll({
      where: {
        supplierId: req.params.supplierId,
      },
    });
    if (supplier.length > 0) {
      res.json({
        status: 200,
        message: "Get Detail Supplier",
        data: supplier,
      });
    } else {
      res.json({
        status: 200,
        message: "Cannot Get Detail Supplier",
        data: [],
      });
    }
  } catch (error) {
    res.json({
      status: 200,
      message: error.message,
    });
  }
};

controller.createSupplier = async function (req, res) {
  try {
    let supplier = await model.supplier.create({
      supplierId: req.body.supplierId,
      nameSupplier: req.body.nameSupplier,
    });
    res.json({
      status: 201,
      message: "Create Data Supplier Success !",
      data: supplier,
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

controller.updateSupplier = async function (req, res) {
  try {
    let supplier = await model.supplier.update(
      {
        supplierId: req.body.supplierId,
        nameSupplier: req.body.nameSupplier,
      },
      {
        where: {
          supplierId: req.params.supplierId,
        },
      }
    );
    res.json({
      status: 200,
      message: "Update Data Supplier Success",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

controller.deleteSupplier = async function (req, res) {
  try {
    let supplier = await model.supplier.destroy({
      where: {
        supplierId: req.params.supplierId,
      },
    });
    res.json({
      status: 200,
      message: "Delete Data Supplier Success",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

module.exports = controller;
