const warframe = require("./../../shared/warframe");
const messaging = require("./../messaging");
const { handleError } = require("./../");

module.exports = {
  name: "earth",
  description: "Returns the current time on earth",
  execute: requestBody => {
    warframe.worldstate
      .earth()
      .then(earth => {
        let text = "";
        if (earth.isDay) {
          text = `It is now day on Earth. Time left: ${earth.timeLeft}`;
        } else {
          text = `It is now night on Earth. Time left: ${earth.timeLeft}`;
        }

        return messaging.sendSlashMessage(
          requestBody.response_url,
          "in_channel",
          text
        );
      })
      .catch(error => handleError(error, requestBody));
  }
};
