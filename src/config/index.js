require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  slackOauth: process.env.SLACK_OAUTH || "",
  prefix: process.env.DISCORD_PREFIX || "!helix",
  botToken: process.env.DISCORD_TOKEN
};
