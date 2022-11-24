const model = require("../config/model/index");
const controller = {};
const commonHelper = require("../helper/common");

controller.listUnit = async function (req, res) {
  try {
    const { role } = req.payload;
    if (role === "user") return commonHelper.response(res, null, 403, "Unauthorized to access data!");
    let unit = await model.unit.findAll();
    if (unit.length > 0) {
      res.json({
        status: 200,
        message: "Get List Unit",
        data: unit,
      });
    } else {
      res.json({
        status: 200,
        message: "Cannot Get List Unit",
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

controller.detailUnit = async function (req, res) {
  try {
    const { role } = req.payload;
    if (role === "user") return commonHelper.response(res, null, 403, "Unauthorized to access data!");
    let unit = await model.unit.findAll({
      where: {
        unitId: req.params.unitId,
      },
    });
    if (unit.length > 0) {
      res.json({
        status: 200,
        message: "Get Detail Unit",
        data: unit,
      });
    } else {
      res.json({
        status: 200,
        message: "Cannot Get Detail Unit",
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

controller.createUnit = async function (req, res) {
  try {
    const { role } = req.payload;
    if (role === "user") return commonHelper.response(res, null, 403, "Unauthorized to access data!");
    let unit = await model.unit.create({
      unitId: req.body.unitId,
      nameUnit: req.body.nameUnit,
    });
    res.json({
      status: 201,
      message: "Create Data Unit Success !",
      data: unit,
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

controller.updateUnit = async function (req, res) {
  try {
    const { role } = req.payload;
    if (role === "user") return commonHelper.response(res, null, 403, "Unauthorized to access data!");
    let unit = await model.unit.update(
      {
        unitId: req.body.unitId,
        nameUnit: req.body.nameUnit,
      },
      {
        where: {
          unitId: req.params.unitId,
        },
      }
    );
    res.json({
      status: 200,
      message: "Update Data Unit Success",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

controller.deleteUnit = async function (req, res) {
  try {
    const { role } = req.payload;
    if (role === "user") return commonHelper.response(res, null, 403, "Unauthorized to access data!");
    let unit = await model.unit.destroy({
      where: {
        unitId: req.params.unitId,
      },
    });
    res.json({
      status: 200,
      message: "Delete Data Unit Success",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

module.exports = controller;
