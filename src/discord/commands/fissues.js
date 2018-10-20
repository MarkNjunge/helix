const warframe = require("./../../shared/warframe");

module.exports = {
  name: "fissures",
  description: "Returns the current fissure missions",
  usage: "",
  execute: async message => {
    const fissures = await warframe.worldstate.fissures();
    const fields = [];

    fissures.forEach(fissure => {
      fields.push({
        name: `${fissure.tier} (${fissure.missionType})`,
        value: `Enemy: ${fissure.enemy}\nExpires: ${fissure.expires}`
      });
    });

    await message.channel.send("Here are the current fissue missions", {
      embed: { fields }
    });
  }
};
