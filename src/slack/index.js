const express = require("express");
const winston = require("winston");
const fs = require("fs");

const messaging = require("./messaging");

const router = express.Router();

// Load all the js files in /commands
const commandFiles = fs
  .readdirSync(__dirname + "/commands")
  .filter(file => file.endsWith(".js"));

const commands = {};

// Add each the export of the files to the commands object
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands[command.name] = command;
}

router.get("/", (req, res) => {
  res.send("Helix Slack endpoint");
});

router.post("/slashes/warframe", (req, res) => {
  winston.debug(
    `User: ${req.body.user_name} (${req.body.user_id}) -> ${req.body.command} ${
      req.body.text
    }`
  );

  res.send("");

  const userCommand = req.body.text.split(" ")[0];

  // Handle help command
  if (userCommand === "help") {
    const attachments = [];

    for (const key in commands) {
      if (commands.hasOwnProperty(key)) {
        const command = commands[key];
        let text = command.description;

        if (command.usage) {
          text += `\nUsage: ${command.name} ${command.usage}`;
        }
        attachments.push({
          title: command.name,
          fallback: command.name,
          text
        });
      }
    }

    messaging
      .sendSlashMessage(
        req.body.response_url,
        "ephemeral",
        "Here are the available commands",
        attachments
      )
      .catch(error => handleError(error, req.body));
    return;
  }

  // Handle regular commands
  if (commands[userCommand]) {
    commands[userCommand].execute(req.body);
    return;
  }

  // Handle unknown command
  winston.warn(`Unknown command: \`${userCommand} ${req.body.text}`);
  messaging
    .sendSlashMessage(
      req.body.response_url,
      "ephemeral",
      "¯\\_(ツ)_/¯\nMaybe try `help`"
    )
    .catch(error => handleError(error, req.body));
});

/**
 * Handle errors requests
 */
function handleError(error, requestBody, query = "") {
  if (
    error.message === "No results found." ||
    error.message === "Request failed with status code 404"
  ) {
    error.message = `No results found for *"${query}"*`;
  }
  winston.error(error.message);

  const attachments = [
    {
      fallback: "Error",
      title: "Error",
      text: error.message,
      color: "danger"
    }
  ];

  messaging
    .sendSlashMessage(
      requestBody.response_url,
      "ephemeral",
      "Error",
      attachments
    )
    .catch(error => handleError(error, requestBody));
}

module.exports = {
  router,
  handleError
};
