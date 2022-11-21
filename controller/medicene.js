const model = require("../config/model/index");
const controller = {};

controller.listMedicene = async function (req, res) {
  try {
    let medicene = await model.medicene.findAll({
      attributes: ['idMedicene','namaObat','stock','tglKadaluarsa','hargaBeli','hargaJual'],
      include: [
        {
          model: model.category
        },
        {
          model: model.storage
        },
        {
          model: model.supplier
        },
        {
          model: model.unit
        },
      ],
    });
    if (medicene.length > 0) {
      res.json({
        status: 200,
        message: "Get List Medicene",
        data: medicene,
      });
    } else {
      res.json({
        status: 200,
        message: "Cannot Get List Medicene",
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

controller.detailMedicene = async function (req, res) {
  try {
    let medicene = await model.medicene.findAll({
      where: {
        idMedicene: req.params.idMedicene,
      },
    });
    if (medicene.length > 0) {
      res.json({
        status: 200,
        message: "Get Detail Medicene",
        data: medicene,
      });
    } else {
      res.json({
        status: 200,
        message: "Cannot Get Detail Medicene",
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

controller.createMedicene = async function (req, res) {
  try {
    let medicene = await model.medicene.create({
      idMedicene: req.body.idMedicene,
      namaObat: req.body.namaObat,
      categoryId: req.body.categoryId,
      stock: req.body.stock,
      unitId: req.body.unitId,
      storageId: req.body.storageId,
      tglKadaluarsa: req.body.tglKadaluarsa,
      hargaBeli: req.body.hargaBeli,
      supplierId: req.body.supplierId,
      hargaJual: req.body.hargaJual,
      keterangan: req.body.keterangan,
    });
    res.json({
      status: 201,
      message: "Create Data Medicene Success !",
      data: medicene,
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

controller.updateMedicene = async function (req, res) {
  try {
    let medicene = await model.medicene.update(
      {
        idMedicene: req.body.idMedicene,
        namaObat: req.body.namaObat,
        categoryId: req.body.categoryId,
        stock: req.body.stock,
        unitId: req.body.unitId,
        storageId: req.body.storageId,
        tglKadaluarsa: req.body.tglKadaluarsa,
        hargaBeli: req.body.hargaBeli,
        supplierId: req.body.supplierId,
        hargaJual: req.body.hargaJual,
        keterangan: req.body.keterangan,
      },
      {
        where: {
          idMedicene: req.params.idMedicene,
        },
      }
    );
    res.json({
      status: 200,
      message: "Update Data Medicene Success",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

controller.deleteMedicene = async function (req, res) {
  try {
    let medicene = await model.medicene.destroy({
      where: {
        idMedicene: req.params.idMedicene,
      },
    });
    res.json({
      status: 200,
      message: "Delete Data Medicene Success",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

module.exports = controller;
