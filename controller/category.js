const model = require("../config/model/index");
const controller = {};
const commonHelper = require("../helper/common");

controller.listCategory = async function (req, res) {
  try {
    const { role } = req.payload;
    if (role === "user") return commonHelper.response(res, null, 403, "Unauthorized to access data!");
    let category = await model.category.findAll();
    if (category.length > 0) {
      res.json({
        status: 200,
        message: "Get List Category",
        data: category,
      });
    } else {
      res.json({
        status: 200,
        message: "Cannot Get List Category",
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

controller.detailCategory = async function (req, res) {
  try {
    const { role } = req.payload;
    if (role === "user") return commonHelper.response(res, null, 403, "Unauthorized to access data!");
    let category = await model.category.findAll({
      where: {
        categoryId: req.params.categoryId,
      },
    });
    if (category.length > 0) {
      res.json({
        status: 200,
        message: "Get Detail Category",
        data: category,
      });
    } else {
      res.json({
        status: 200,
        message: "Cannot Get Detail Category",
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

controller.createCategory = async function (req, res) {
  try {
    const { role } = req.payload;
    if (role === "user") return commonHelper.response(res, null, 403, "Unauthorized to access data!");
    let category = await model.category.create({
      categoryId: req.body.categoryId,
      nameCategory: req.body.nameCategory,
    });
    res.json({
      status: 201,
      message: "Create Data Category Success !",
      data: category,
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

controller.updateCategory = async function (req, res) {
  try {
    const { role } = req.payload;
    if (role === "user") return commonHelper.response(res, null, 403, "Unauthorized to access data!");
    let category = await model.category.update(
      {
        categoryId: req.body.categoryId,
        nameCategory: req.body.nameCategory,
      },
      {
        where: {
          categoryId: req.params.categoryId,
        },
      }
    );
    res.json({
      status: 200,
      message: "Update Data Category Success",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

controller.deleteCategory = async function (req, res) {
  try {
    const { role } = req.payload;
    if (role === "user") return commonHelper.response(res, null, 403, "Unauthorized to access data!");
    let category = await model.category.destroy({
      where: {
        categoryId: req.params.categoryId,
      },
    });
    res.json({
      status: 200,
      message: "Delete Data Category Success",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

module.exports = controller;
