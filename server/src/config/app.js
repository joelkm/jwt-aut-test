const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const handleError = require('../middlewares/error-handler');
const { NotFoundError } = require('./app-error');

const corsOptions = {
    origin: "*",
    credentials: true,
  };

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOptions));

app.use("/", require("../views"));

app.use("/user", require("../user"));

app.use("*", (req, res, next) => {
  next(new NotFoundError(`Could not handle ${req.method} request in '${req.baseUrl}'`));
});
app.use((err, req, res, next) => {
  handleError(err, req, res);
});

module.exports = app;