const warframe = require("./../../shared/warframe");

module.exports = {
  name: "search",
  description: "Searches the wiki",
  args: true,
  usage: "<item>",
  execute: async (message, args) => {
    let query = "";
    args.forEach(arg => {
      query += arg;
      query += " ";
    });
    query = query.trim();

    const results = await warframe.wiki.search(query, 3);
    results.forEach(async result => {
      await message.channel.send("", {
        embed: {
          title: result.title,
          description: result.description,
          url: result.url
        }
      });
    });
  }
};
