const warframe = require("./../../shared/warframe");
const messaging = require("./../messaging");
const { handleError } = require("./../");

module.exports = {
  name: "baro",
  description: "Returns the current details on Baro Ki'Teer",
  usage: "",
  execute: requestBody => {
    warframe.worldstate
      .voidTrader()
      .then(voidTrader => {
        let text = "";
        if (voidTrader.active) {
          text = `Baro Ki'Teer is here for *${voidTrader.end}*\nLocation: *${
            voidTrader.location
          }*`;
        } else {
          text = `Baro Ki'Teer is coming in *${voidTrader.start}* to *${
            voidTrader.location
          }*`;
        }

        const attachments = [];

        voidTrader.inventory.forEach(element => {
          attachments.push({
            title: element.item,
            fallback: element.item,
            text: `Ducats: ${element.ducats}, Credits: ${element.credits}`
          });
        });

        return messaging.sendSlashMessage(
          requestBody.response_url,
          "in_channel",
          text,
          attachments
        );
      })
      .catch(error => handleError(error, requestBody));
  }
};
