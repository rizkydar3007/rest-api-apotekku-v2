const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../helper/auth");
const commonHelper = require("../helper/common");
const {
  findEmail,
  findNip,
  insertUser,
  findId,
  selectAllUsers,
  countAllUsers,
} = require('../config/model/users');

// let refreshTokens = [];
const usersController = {
  register: async (req, res) => {
    try {
      // Mengambil input dari req.body dan memberi nilai default jika tidak diisi
      const id = req.body.id || 0;
      const name = req.body.name || "";
      const email = req.body.email || "";
      const nip = req.body.nip || 0;
      const password = req.body.password || "";

      // Membuat variabel role, errorMessage untuk menampung error input, dan variabel untuk mengecek digit pertama NIP
      const textNip = nip.toString();
      const firstDigitNip = textNip.split("")[0];
      let role = "";
      let errorMessage = [];

      //Verifikasi kelengkapan data untuk diinsert ke tabel users
      if (!id || !name || !email || !nip || !password) {
        errorMessage.push("Input is incomplete! Check your input!");
      }

      //Verifikasi ID (apakah ID sudah terdaftar)
      const resultId = await findId(id);

      if (resultId.length > 0) {
        errorMessage.push("ID already registered!");
      }

      //Verifikasi email dan pengecekan apakah email sudah terdaftar
      const emailChecker =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!String(email).toLowerCase().match(emailChecker)) {
        errorMessage.push("Email is invalid!");
      }

      const resultEmail = await findEmail(email);

      if (resultEmail.length > 0) {
        errorMessage.push(
          "Email already registered! Please use another email address!"
        );
      }

      //Verifikasi NIP dan pengecekan apakah NIP sudah terdaftar
      if (
        !Number.isInteger(nip) ||
        nip < 0 ||
        firstDigitNip < 1 ||
        firstDigitNip > 3
      ) {
        errorMessage.push("Invalid NIP");
      }
      if (textNip.length < 8 || textNip.length > 20) {
        errorMessage.push("NIP must be 8 - 20 digit number!");
      }

      const resultNip = await findNip(nip);
      if (resultNip.length > 0) {
        errorMessage.push(
          "NIP already registered! Please use another NIP number!"
        );
      }

      //Verifikasi password dan hash password
      if (password.length < 6 || password.length > 20) {
        errorMessage.push("Password must be 6 - 20 characters!");
      }
      const passwordHash = bcrypt.hashSync(password, 10);

      //Penentuan role dilihat dari digit pertama NIP
      if (firstDigitNip === "1") {
        role = "superuser";
      } else if (firstDigitNip === "2") {
        role = "admin";
      } else if (firstDigitNip === "3") {
        role = "user";
      }

      //Menampilkan error message jika ada error, atau melakukan insert data user
      if (errorMessage.length > 0) {
        commonHelper.response(
          res,
          errorMessage,
          409,
          "Invalid registration input! Check data for details!"
        );
      } else {
        const insertData = {
          id,
          name,
          email,
          nip,
          passwords: passwordHash,
          role,
        };
        insertUser(insertData)
          .then((result) =>
            commonHelper.response(
              res,
              { affectedRows: result.affectedRows },
              200,
              "Succesfully registered!"
            )
          )
          .catch((error) =>
            commonHelper.response(res, error, 500, "Internal server error")
          );
      }
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    try {
      // Mengambil input dari req.body dan memberi nilai default jika tidak diisi
      const email = req.body.email || "";
      const password = req.body.password || "";

      // Mengecek apakah email sudah terdaftar
      const [user] = await findEmail(email);
      if (!user)
        return commonHelper.response(
          res,
          null,
          404,
          "Email not registered! Please check your email address!"
        );

      // Mengecek apakah password sesuai dengan email
      const isValidPassword = bcrypt.compareSync(password, user.Passwords);
      if (!isValidPassword)
        return commonHelper.response(
          res,
          null,
          401,
          "Password is invalid! Please check your password!"
        );

      // Membuat access token dan refresh token untuk otentikasi
      delete user.Passwords;
      const payload = {
        email: user.Email,
        role: user.Role,
      };
      user.accessToken = generateAccessToken(payload);
      user.refreshToken = generateRefreshToken(payload);

      //Mengirimkan data user dan token atau menampilkan error
      commonHelper.response(res, user, 200, "Login successful!");
    } catch (error) {
      console.log(error);
    }
  },

  refreshToken: async (req, res) => {
    try {
      // Mengambil dan mengecek ada tidaknya refresh token di body
      const refreshToken = req.body.refreshToken;
      if (!refreshToken) {
        return commonHelper.response(
          res,
          null,
          401,
          "No refresh token detected!"
        );
      }

      // Melakukan verifikasi refresh token dan menghasilkan access token
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const payload = {
        email: decoded.email,
        role: decoded.user,
      };
      const newAccessToken = {
        accessToken: generateAccessToken(payload),
      };

      //Mengirimkan access token yang dihasilkan atau menampilkan error
      commonHelper.response(
        res,
        newAccessToken,
        200,
        "Generate access token succesful!"
      );
    } catch (error) {
      console.log(error);
      if (error && error.name === "JsonWebTokenError") {
        commonHelper.response(res, error, 401, "Invalid access token!");
      } else if (error && error.name === "TokenExpiredError") {
        commonHelper.response(res, error, 401, "Access token expired!");
      } else {
        commonHelper.response(res, error, 500, "Internal server error!");
      }
    }
  },

  listUsers: async (req, res) => {
    try {
      // Pengecekan role untuk otorisasi
      const {role} = req.payload;
      if (role === "user") return commonHelper.response(res, null, 403, "Unauthorized to access data!");
      
      // Mengambil data query dan menentukan default value query
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const offset = (page - 1) * limit;
      const orderby = req.query.orderby || "ID";
      const order = req.query.order || "ASC";

      // Melakukan fungsi untuk menampilkan data users dan melakukan pagination 
      const result = await selectAllUsers(limit, offset, orderby, order);
      const [userCount] = await countAllUsers();
      const totalData = userCount.count;
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: parseInt(page),
        limit: parseInt(limit),
        totalPage: totalPage,
        totalData: totalData,
      };

      //Mengirimkan data users atau menampilkan error
      commonHelper.response(res, result, 200, "Get data success!", pagination);
    } catch (error) {
      console.log(error);
      
      if (error && error.code === "ER_SP_UNDECLARED_VAR") {
        commonHelper.response(
          res,
          error,
          400,
          "Undeclared variable! Check your query params!"
        );
      } else {
        commonHelper.response(res, null, 500);
      }
    }
  },

  // logout: async (req, res) => {
  //   try {
  //     refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  //     commonHelper.response(res, [], 204, "");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  // profile: (req, res) => {
  //   const posts = [
  //     {
  //       email: "bram@gmail.com",
  //       judul: "admin",
  //     },
  //     {
  //       email: "rizky@gmail.com",
  //       judul: "superuser",
  //     },
  //   ];

  //   try {
  //     res.json(posts.filter((post) => post.email === req.user.email));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};

module.exports = usersController;
