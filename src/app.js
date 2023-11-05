const express = require("express");
const app = express();

const compression = require("compression");
const cors = require("cors");

// init middleware
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// init db
require("./database/init.db");

// init routes
app.get("/wel", (req, res, next) => {
  return res.status(200).json({ message: "Heh comes to Magic Post system", metadata: '' });
});

app.use('/', require('./routes/route'))

// handle errors
const {logErrorMiddleware, returnError, is404Handler, isOperationalError} = require("./middleware/errorHandler");
app.use(is404Handler)
app.use(logErrorMiddleware)
app.use(returnError)

module.exports = app;