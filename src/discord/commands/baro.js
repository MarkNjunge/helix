const warframe = require("./../../shared/warframe");

module.exports = {
  name: "baro",
  description: "Returns the current details on Baro Ki'Teer",
  usage: "",
  execute: async message => {
    const voidTrader = await warframe.worldstate.voidTrader();

    if (!voidTrader.active) {
      message.channel.send(
        `Baro Ki'Teer is coming in *${voidTrader.start}* to *${
          voidTrader.location
        }*`
      );

      return;
    }

    const fields = [];

    voidTrader.inventory.forEach(element => {
      fields.push({
        name: element.item,
        value: `${element.ducats} ducats + ${element.credits} credits`,
        inline: true
      });
    });

    await message.channel.send(`Baro Ki'Teer is at ${voidTrader.location}`, {
      embed: {
        fields,
        footer: {
          text: `Available for ${voidTrader.end}`
        }
      }
    });
  }
};
