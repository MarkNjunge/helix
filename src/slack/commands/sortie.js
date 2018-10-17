const warframe = require("./../../shared/warframe");
const messaging = require("./../messaging");
const { handleError } = require("./../");

module.exports = {
  name: "sortie",
  description: "Returns the current sortie",
  execute: requestBody => {
    warframe.worldstate
      .sortie()
      .then(result => {
        const attachments = [];

        result.missions.forEach(mission => {
          const text = `${mission.node}\n${mission.modifier}\n${
            mission.modifierDescription
          }`;
          attachments.push({
            title: mission.missionType,
            fallback: mission.missionType,
            text
          });
        });
        return messaging.sendSlashMessage(
          requestBody.response_url,
          "in_channel",
          `Here is the current sortie.\nBoss: *${result.boss}*\nFaction: *${
            result.faction
          }*\nExpires in *${result.availableFor}*`,
          attachments
        );
      })
      .catch(error => handleError(error, requestBody));
  }
};
