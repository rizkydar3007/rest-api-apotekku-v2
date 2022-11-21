const model = require("../config/model/index");
const controller = {};

controller.listStorage = async function (req, res) {
  try {
    let storage = await model.storage.findAll();
    if (storage.length > 0) {
      res.json({
        status: 200,
        message: "Get List Storage",
        data: storage,
      });
    } else {
      res.json({
        status: 200,
        message: "Cannot Get List Storage",
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

controller.detailStorage = async function (req, res) {
  try {
    let storage = await model.storage.findAll({
      where: {
        storageId: req.params.storageId,
      },
    });
    if (storage.length > 0) {
      res.json({
        status: 200,
        message: "Get Detail Storage",
        data: storage,
      });
    } else {
      res.json({
        status: 200,
        message: "Cannot Get Detail Storage",
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

controller.createStorage = async function (req, res) {
  try {
    let storage = await model.storage.create({
      storageId: req.body.storageId,
      nameStorage: req.body.nameStorage,
    });
    res.json({
      status: 201,
      message: "Create Data Storage Success !",
      data: storage,
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

controller.updateStorage = async function (req, res) {
  try {
    let storage = await model.storage.update(
      {
        storageId: req.body.storageId,
        nameStorage: req.body.nameStorage,
      },
      {
        where: {
          storageId: req.params.storageId,
        },
      }
    );
    res.json({
      status: 200,
      message: "Update Data Storage Success",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

controller.deleteStorage = async function (req, res) {
  try {
    let storage = await model.storage.destroy({
      where: {
        storageId: req.params.storageId,
      },
    });
    res.json({
      status: 200,
      message: "Delete Data Storage Success",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

module.exports = controller;
