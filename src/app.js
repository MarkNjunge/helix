const bodyParser = require("body-parser");
const express = require("express");
const winston = require("winston");
const fs = require("fs");

if (!fs.existsSync(__dirname + "/../logs")) {
  fs.mkdirSync(__dirname + "/../logs");
}

// Initialize logger
const { combine, timestamp, printf } = winston.format;
const customFormat = printf(
  info => `${info.timestamp} ${info.level}: ${info.message}`
);
winston.configure({
  level: "debug",
  format: combine(timestamp(), customFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: __dirname + "/../logs/combined.log",
      format: combine(timestamp(), customFormat)
    })
  ]
});

const config = require("./config");
const slack = require("./slack");
require("./discord");

const PORT = config.port || process.argv[2] || 3000;

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("*", (req, res, next) => {
  winston.debug(`${req.method} ${req.originalUrl}`);

  next();
});

app.get("/", (req, res) => {
  res.send("🤖 Helix");
});

app.use("/slack", slack.router);

app.listen(PORT, error => {
  if (error) {
    winston.error(error.message);
  } else {
    winston.info(`Running on port ${PORT}`);
  }
});
