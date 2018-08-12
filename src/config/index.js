require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  slackOauth: process.env.SLACK_OAUTH || ""
};
