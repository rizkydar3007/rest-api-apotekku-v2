require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mainRouter = require("./routes/index");

app.use(cors());
const swaggerUi = require("swagger-ui-express");
const api = require("./api.json");
app.use("/api-docs/user", swaggerUi.serve, swaggerUi.setup(api));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", mainRouter);

app.use((req, res, next) => {
  const error = new Error("Tidak ditemukan");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      mesage: error.message,
    },
  });
});

module.exports = app;
