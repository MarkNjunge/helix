const warframe = require("./../../shared/warframe");

module.exports = {
  name: "earth",
  description: "Returns the current time on earth",
  usage: "",
  execute: async message => {
    const earth = await warframe.worldstate.earth();
    await message.channel.send(
      `It is now ${earth.isDay ? "day" : "night"} on Earth. Time left: ${
        earth.timeLeft
      }`
    );
  }
};
