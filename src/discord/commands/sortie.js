const warframe = require("./../../shared/warframe");

module.exports = {
  name: "sortie",
  description: "Returns the current sortie",
  usage: "",
  execute: async message => {
    const result = await warframe.worldstate.sortie();

    const fields = [];
    fields.push({
      name: "Boss",
      value: result.boss,
      inline: true
    });
    fields.push({
      name: "Faction",
      value: result.faction,
      inline: true
    });

    fields.push({
      name: "\u200B",
      value: "\u200B"
    });

    result.missions.forEach(mission => {
      const text = `${mission.modifier}`;
      fields.push({
        name: `${mission.missionType} - ${mission.node}`,
        value: text
      });
    });

    await message.channel.send("Here are the current sorties", {
      embed: {
        fields,
        footer: {
          text: "Available until "
        },
        timestamp: new Date(result.expiry * 1000)
      }
    });
  }
};
