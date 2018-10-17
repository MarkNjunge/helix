const warframe = require("./../../shared/warframe");
const messaging = require("./../messaging");
const { handleError } = require("./../");

module.exports = {
  name: "fissures",
  description: "Returns the current fissure missions",
  execute: requestBody => {
    warframe.worldstate
      .fissures()
      .then(fissures => {
        const attachments = [];

        fissures.forEach(fissure => {
          attachments.push({
            title: `${fissure.tier} (${fissure.missionType})`,
            fallback: `${fissure.tier} (${fissure.missionType})`,
            text: `Enemy: ${fissure.enemy}\nExpires: ${fissure.expires}`
          });
        });

        return messaging.sendSlashMessage(
          requestBody.response_url,
          "in_channel",
          "Here are the current fissure missions.",
          attachments
        );
      })
      .catch(error => handleError(error, requestBody));
  }
};
