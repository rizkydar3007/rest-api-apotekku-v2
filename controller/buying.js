const commonHelper = require("../helper/common");
const {
  selectAllDetailBuying,
  selectAllBuying,
  selectAllBuyingById,
  insertBuying,
  insertDetailBuying,
  deleteBuying,
  countAllBuying,
  countAllDetailBuying,
} = require('../config/model/buying');


const buyingController = {
  listDetailBuying: async (req, res) => {
    try {
      // Mengambil query dan memberi nilai default
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const offset = (page - 1) * limit;
      const orderby = req.query.orderby || "detail_pembelian.ID";
      const order = req.query.order || "";
      const search = req.query.search || "";

      //Menjalankan fungsi select all dan membuat pagination
      const result = await selectAllDetailBuying(limit, offset, orderby, order, search);
      const [detailBuyingCount] = await countAllDetailBuying();
      const totalData = detailBuyingCount.count;
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: parseInt(page),
        limit: parseInt(limit),
        totalPage: totalPage,
        totalData: totalData,
      };

      //Menampilkan hasil atau error
      commonHelper.response(res, result, 200, "Get data success!", pagination);
    } catch (error) {
      console.log(error);
      if (
        error.code === "ER_SP_UNDECLARED_VAR" ||
        error.code === "ER_BAD_FIELD_ERROR"
      ) {
        commonHelper.response(
          res,
          error.sqlMessage,
          400,
          "Undeclared variable! Check your query params!"
        );
      } else {
        commonHelper.response(res, null, 500);
      }
    }
  },

  listBuying: async (req, res) => {
    try {
      // Mengambil query dan memberi nilai default
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const offset = (page - 1) * limit;
      const orderby = req.query.orderby || "pembelian.ID";
      const order = req.query.order || "DESC";

      //Menjalankan fungsi select all dan membuat pagination
      const result = await selectAllBuying(limit, offset, orderby, order);
      const [buyingCount] = await countAllBuying();
      const totalData = buyingCount.count;
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: parseInt(page),
        limit: parseInt(limit),
        totalPage: totalPage,
        totalData: totalData,
      };

      //Menampilkan hasil atau error
      commonHelper.response(res, result, 200, "Get data success!", pagination);
    } catch (error) {
      console.log(error);
      if (
        error.code === "ER_SP_UNDECLARED_VAR" ||
        error.code === "ER_BAD_FIELD_ERROR"
      ) {
        commonHelper.response(
          res,
          error,
          400,
          "Failed to get data! Check your query params!"
        );
      } else {
        commonHelper.response(res, null, 500);
      }
    }
  },

  listBuyingById: async (req, res) => {
    try {
      // Mengambil query dan memberi nilai default
      const id = Number(req.params.id);
      const orderby = req.query.orderby || "detail_pembelian.ID";
      const order = req.query.order || "DESC";

      //Menjalankan fungsi select all
      const result = await selectAllBuyingById(id, orderby, order);

      //Menampilkan hasil atau error
      if (result.length === 0)
        return commonHelper.response(
          res,
          result,
          404,
          "Data not found! Check your params!"
        );

      return commonHelper.response(res, result, 200, "Get data success!");
    } catch (error) {
      console.log(error);
      if (
        error.code === "ER_SP_UNDECLARED_VAR" ||
        error.code === "ER_BAD_FIELD_ERROR"
      ) {
        commonHelper.response(
          res,
          error,
          400,
          "Failed to get data! Check your query params!"
        );
      } else {
        commonHelper.response(res, null, 500);
      }
    }
  },

  insertBuyingAndDetail: async (req, res) => {
    // Mengambil input dari req.body dan membuat variabel untuk result (hasil)
    const {
      buyingId,
      detailBuyingId,
      detailMedicines,
      transactionDate,
      userId,
    } = req.body;
    let resultBuying = {};
    let resultDetailBuying = {};
    let result = {};

    try {
      // Verifikasi kelengkapan data untuk diinsert ke tabel
      if (
        !detailBuyingId ||
        !buyingId ||
        !detailMedicines ||
        !transactionDate ||
        !userId
      ) {
        return commonHelper.response(
          res,
          [],
          400,
          "Incomplete input data! Check your input!"
        );
      }

      // Menjalankan fungsi untuk melakukan insert di tabel pembelian dan detail_pembelian
      resultBuying = await insertBuying(buyingId, transactionDate, userId);
      if (resultBuying) {
        result = { ...result, buyingInsertedRows: resultBuying.affectedRows };
      }
      resultDetailBuying = await insertDetailBuying(
        detailBuyingId,
        buyingId,
        detailMedicines
      );
      if (resultDetailBuying) {
        result = {
          ...result,
          detailBuyingInsertedRows:
            resultDetailBuying[resultDetailBuying.length - 1].affectedRows,
        };
      }

      // Menampilkan error atau pesan sukses
      return commonHelper.response(res, result, 200, "Insert data successful!");
    } catch (error) {
      console.log(error);
      // Apabila insert ke tabel pembelian berhasil namun insert ke tabel detail_pembelian gagal, maka hapus hasil insert tabel pembelian
      if (resultBuying) {
        deleteBuying(buyingId);
      }
      return res.send(error);
    }
  },
};

module.exports = buyingController;
