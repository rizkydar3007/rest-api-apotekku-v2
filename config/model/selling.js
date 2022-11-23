const connection = require("../database/db");

const selectAllDetailSelling = (limit, offset, orderby, order) => {
  return new Promise((resolve, reject) =>
    connection.query(
      `SELECT detail_penjualan.ID, medicene.namaObat, detail_penjualan.jumlah_satuan_obat, detail_penjualan.Subtotal, detail_penjualan.ID_penjualan, (SELECT SUM(detail_penjualan.Subtotal) AS harga_total FROM detail_penjualan) AS harga_total, penjualan.tgl_transaksi
      FROM detail_penjualan
      JOIN medicene
      ON detail_penjualan.ID_obat = medicene.idMedicene
      JOIN penjualan
      ON detail_penjualan.ID_penjualan = penjualan.ID
      ORDER BY ${orderby} ${order} LIMIT ${limit} OFFSET ${offset}`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const selectAllSelling = (limit, offset, orderby, order) => {
  return new Promise((resolve, reject) =>
    connection.query(
      `SELECT * FROM penjualan
      ORDER BY ${orderby} ${order} LIMIT ${limit} OFFSET ${offset}`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const selectAllSellingById = (id, orderby, order) => {
  return new Promise((resolve, reject) =>
    connection.query(
      `SELECT detail_penjualan.ID AS id_detail_penjualan, obat.ID AS id_obat, obat.Nama as obat, detail_penjualan.jumlah_satuan_obat, detail_penjualan.subtotal, penjualan.total FROM detail_penjualan
      JOIN obat
      ON detail_penjualan.ID_obat = obat.ID
      JOIN penjualan
      ON detail_penjualan.ID_penjualan = penjualan.ID
      WHERE penjualan.ID=${id}
      ORDER BY ${orderby} ${order}`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const countAllSelling = () => {
  return new Promise((resolve, reject) =>
    connection.query(`SELECT COUNT(ID) AS count FROM penjualan`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const countAllDetailSelling = () => {
  return new Promise((resolve, reject) =>
    connection.query(`SELECT COUNT(ID) AS count FROM detail_penjualan`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const insertSelling = (sellingId, customer, transactionDate, userId) => {
  return new Promise((resolve, reject) =>
    connection.query(
      `INSERT INTO penjualan (ID, customer, total, tgl_transaksi, ID_users)
      VALUES (${sellingId}, '${customer}', 0, '${transactionDate}', ${userId})`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const deleteSelling = (sellingId) => {
  return new Promise((resolve, reject) =>
    connection.query(`DELETE FROM penjualan WHERE ID=${sellingId}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const insertDetailSelling = (detailSellingId, sellingId, detailMedicines) => {
  let subtotalQuery = ``;
  let firstMedicineQuery = `INSERT INTO detail_penjualan(ID, ID_penjualan, ID_obat, jumlah_satuan_obat, subtotal)
  VALUES (${detailSellingId}, ${sellingId}, ${detailMedicines[0].id}, ${detailMedicines[0].qty}, @harga_subtotal_0)`;
  let secondMedicineQuery = ``;
  let insertQuery = ``;

  for (let i = 0; i < detailMedicines.length; i++) {
    subtotalQuery += `SET @harga_subtotal_${i}=((SELECT hargaJual FROM medicene WHERE medicene.idMedicene=${detailMedicines[i].id})*${detailMedicines[i].qty});
    `;
  }

  if (detailMedicines.length > 1) {
    for (let i = 1; i < detailMedicines.length; i++) {
      secondMedicineQuery += `,(${detailSellingId + i}, ${sellingId}, ${detailMedicines[i].id}, ${detailMedicines[i].qty}, @harga_subtotal_${i})`;
    }
  }

  insertQuery = `${subtotalQuery} ${firstMedicineQuery}${secondMedicineQuery}`;

  return new Promise((resolve, reject) =>
    connection.query(`${insertQuery}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
        console.log(error);
      }
    })
  );
};

module.exports = {
  selectAllDetailSelling,
  selectAllSelling,
  selectAllSellingById,
  insertSelling,
  deleteSelling,
  insertDetailSelling,
  countAllDetailSelling,
  countAllSelling,
};
