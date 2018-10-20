const warframe = require("./../../shared/warframe");

module.exports = {
  name: "alerts",
  description: "Returns the current alerts",
  usage: "",
  execute: async message => {
    const alerts = await warframe.worldstate.alerts();

    alerts.forEach(async alert => {
      const fields = [];
      fields.push({
        name: "Mission",
        value: `${alert.faction} ${alert.type}`,
        inline: true
      });
      fields.push({
        name: "Level",
        value: `${alert.minEnemyLevel} - ${alert.maxEnemyLevel}`,
        inline: true
      });
      fields.push({
        name: "Location",
        value: alert.node,
        inline: true
      });
      alert.reward.items.map(i => {
        fields.push({
          name: "Item rewards",
          value: i,
          inline: true
        });
      });
      fields.push({
        name: "Credit rewards",
        value: alert.reward.credits,
        inline: true
      });

      if (alert.archwing) {
        fields.push({
          name: "",
          value: "Archwing requred",
          inline: true
        });
      }

      await message.channel.send("", {
        embed: {
          thumbnail: { url: alert.reward.thumbnail },
          fields,
          footer: {
            text: "Avalable until"
          },
          timestamp: new Date(alert.expiry * 1000)
        }
      });
    });
  }
};
