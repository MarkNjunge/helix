const warframe = require("./../../shared/warframe");

module.exports = {
  name: "news",
  description: "Returns the current news",
  usage: "",
  execute: async message => {
    let news = await warframe.worldstate.news();

    // Limit to the last 3
    news = news.slice(0, 3);

    news.forEach(item => {
      message.channel.send("", {
        embed: {
          title: item.message,
          thumbnail: {
            url: item.imageLink
          },
          url: item.link,
          timestamp: new Date(item.date * 1000)
        }
      });
    });
  }
};
