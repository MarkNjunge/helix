const warframe = require("./../../shared/warframe");

module.exports = {
  name: "get",
  description: "Return the first item from the wiki",
  args: true,
  usage: "<item>",
  execute: async (message, args) => {
    let query = "";
    args.forEach(arg => {
      query += arg;
      query += " ";
    });
    query = query.trim();

    const result = await warframe.wiki.getDetails(query);

    await message.channel.send(`Here is the top result for *${query}*`, {
      embed: {
        title: result.title,
        description: result.description,
        thumbnail: {
          url: result.image_url
        },
        url: result.url
      }
    });
  }
};
