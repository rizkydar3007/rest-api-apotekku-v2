const connection = require("../database/db");

const findId = (id) => {
  return new Promise((resolve, reject) =>
    connection.query(`SELECT * FROM users WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    connection.query(
      `SELECT * FROM users WHERE email='${email}'`,
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

const findNip = (nip) => {
  return new Promise((resolve, reject) =>
    connection.query(
      `SELECT * FROM users WHERE nip='${nip}'`,
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

const insertUser = (data) => {
  const { id, name, email, nip, passwords, role } = data;
  return new Promise((resolve, reject) =>
    connection.query(
      `INSERT INTO users(id,name,email,nip,passwords,role) VALUES(${id},'${name}','${email}',${nip},'${passwords}','${role}')`,
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

const selectAllUsers = (limit, offset, orderby, order) => {
  return new Promise((resolve, reject) =>
    connection.query(
      `SELECT * FROM users ORDER BY ${orderby} ${order} LIMIT ${limit} OFFSET ${offset}`,
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

const countAllUsers = () => {
  return new Promise((resolve, reject) =>
    connection.query(
      `SELECT COUNT(ID) AS count FROM users`,
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

module.exports = {
  findId,
  findEmail,
  findNip,
  insertUser,
  selectAllUsers,
  countAllUsers,
};
