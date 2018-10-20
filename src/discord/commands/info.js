const { prefix } = require("./../../config");

module.exports = {
  name: "info",
  description: "Returns info about the bot.",
  usage: "",
  execute: async message => {
    const data = [];
    data.push("Here's info about the bot");
    data.push("");
    data.push("**Name**: Helix");
    data.push(`**Prefix**: ${prefix}`);
    data.push("**Website**: https://helix.marknjunge.com/");
    data.push("**Source Code**: https://github.com/marknjunge/helix");
    data.push("**Developer**: Mark Njung'e");

    await message.channel.send(data);
  }
};
