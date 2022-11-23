const jwt = require("jsonwebtoken");
const commonHelper = require("../helper/common");

const authAccessToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (!accessToken) {
      commonHelper.response(res, [], 402, "Access token not found!");
    } else {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.payload = decoded;
      next();
    }
  } catch (error) {
    console.log(error);
    if (error && error.name === "JsonWebTokenError") {
      return commonHelper.response(res, error, 401, "Invalid access token!");
    } else if (error && error.name === "TokenExpiredError") {
      return commonHelper.response(res, error, 401, "Access token expired!");
    } else {
      return commonHelper.response(res, error, 500, "Internal server error!");
    }
  }
};

module.exports = { authAccessToken };
