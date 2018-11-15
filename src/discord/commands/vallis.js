const warframe = require("./../../shared/warframe");

module.exports = {
  name: "vallis",
  description: "Returns the current cold/warm cycle on Orb Vallis",
  usage: "",
  execute: async message => {
    const result = await warframe.worldstate.vallis();
    const color = result.isWarm ? 0xec7505 : 0x0471ed;
    const temp = result.isWarm ? "Warm" : "Cold";

    await message.channel.send("Vallis Cycle", {
      embed: {
        title: `It is currently ${temp}.`,
        color,
        footer: {
          text: "Expires "
        },
        timestamp: result.expiry
      }
    });
  }
};
