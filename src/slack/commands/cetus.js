const warframe = require("./../../shared/warframe");
const messaging = require("./../messaging");
const { handleError } = require("./../");

module.exports = {
  name: "cetus",
  description: "Returns the current time on and bounties cetus",
  execute: requestBody => {
    warframe.worldstate
      .cetus()
      .then(cetus => {
        const attachments = [];

        let timeOfDay = "";
        if (cetus.isDay) {
          timeOfDay = "day";
        } else {
          timeOfDay = "night";
        }
        const text = `It is now *${timeOfDay}* on Cetus. Time left: *${
          cetus.timeLeft
        }*\nBounties expire in: *${cetus.expires}*`;

        cetus.bounties.forEach(bounty => {
          attachments.push({
            fallback: bounty.type,
            title: bounty.type,
            text: `Enemy levels: ${
              bounty.enemyLevels
            }\nRewards: ${bounty.rewardPool
              .toString()
              .replace(/\[|\]/gi, "")
              .replace(/,/gi, ", ")}`
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
