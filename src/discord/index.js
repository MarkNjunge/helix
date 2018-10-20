const fs = require("fs");
const winston = require("winston");
const Discord = require("discord.js");

const { prefix, botToken } = require("./../config");

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load command files
const commandFiles = fs
  .readdirSync(__dirname + "/commands")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  winston.info(`Logged in as ${client.user.tag}!`);
});

client.on("message", async message => {
  // Ignore if the message is not a request to the bot or was made by the bot
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  winston.info(
    `${message.guild ? message.guild.name + " -> " : ""}${
      message.author.username
    }#${message.author.discriminator}-> ${message.content}`
  );

  // Extract args from message by splitting at spaces
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);

  // Use the first arg command name
  const commandName = args.shift().toLowerCase();

  // Find command for the name
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  // Check if command exists
  if (!command) {
    return;
  }

  // Check if the command requires args
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${
        command.usage
      }\``;
    }

    return message.channel.send(reply);
  }

  try {
    await command.execute(message, args);
    await message.react("✅");
  } catch (error) {
    winston.error(error);
    message.reply("There was an error trying to execute that command!");
  }
});

client.login(botToken);
