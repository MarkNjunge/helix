const warframe = require("./../../shared/warframe");
const messaging = require("./../messaging");
const { handleError } = require("./../");

module.exports = {
  name: "alerts",
  description: "Returns the current alerts",
  execute: requestBody => {
    warframe.worldstate
      .alerts()
      .then(results => {
        const attachments = [];

        results.forEach(alert => {
          let text = `${alert.node}\n${alert.faction} level ${
            alert.minEnemyLevel
          } - ${alert.maxEnemyLevel}`;

          if (alert.archwing) {
            text = `${alert.node} (Archwing)\n${alert.faction} level ${
              alert.minEnemyLevel
            } - ${alert.maxEnemyLevel}`;
          }

          attachments.push({
            title: alert.type,
            fallback: alert.type,
            text,
            thumb_url: alert.reward.thumbnail,
            fields: [
              {
                title: "Rewards",
                value: alert.reward.asString.replace("cr", " credits")
              }
            ],
            footer: "Avalable until",
            ts: alert.expiry
          });
        });

        return messaging.sendSlashMessage(
          requestBody.response_url,
          "in_channel",
          "",
          attachments
        );
      })
      .catch(error => handleError(error, requestBody));
  }
};
