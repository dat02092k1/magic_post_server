const express = require("express");
const compression = require("compression");
const cors = require("cors");
const app = express();

// init middleware
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// router.use(aclMiddleware);

// init db
require("./database/init.db");

// init routes
app.get("/", (req, res, next) => {
  return res.status(200).json({ message: "Heh comes to Magic Post system", metadata: '' });
});

app.use('/', require('./routes/route'))

// handle errors
const {logErrorMiddleware, returnError, is404Handler, isOperationalError} = require("./middleware/errorHandler");

app.use(is404Handler)
app.use(logErrorMiddleware)
app.use(returnError)

// cron job
const cronJobTaks = require("./helpers/cron-job");
cronJobTaks.updateStatus();
cronJobTaks.removeUser();

module.exports = app;    