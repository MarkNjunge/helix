const warframe = require("./../../shared/warframe");

module.exports = {
  name: "cetus",
  description: "Returns the current time on and bounties cetus",
  usage: "",
  execute: async message => {
    const cetus = await warframe.worldstate.cetus();

    const fields = [];

    let timeOfDay = "";
    if (cetus.isDay) {
      timeOfDay = "day";
    } else {
      timeOfDay = "night";
    }

    const text = `It is now ${timeOfDay} on Cetus.\nTime left: ${
      cetus.timeLeft
    }`;

    cetus.bounties.forEach(bounty => {
      fields.push({
        name: bounty.type,
        value: `Enemy levels: ${
          bounty.enemyLevels
        }\nRewards: ${bounty.rewardPool
          .toString()
          .replace(/\[|\]/gi, "")
          .replace(/,/gi, ", ")}`,
        inline: true
      });
    });

    await message.channel.send(text, {
      embed: { fields, footer: { text: `Avaiable for ${cetus.expires}` } }
    });
  }
};
