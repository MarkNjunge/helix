const moment = require("moment");
const warframe = require("./../../shared/warframe");
const messaging = require("./../messaging");
const { handleError } = require("./../");

module.exports = {
  name: "news",
  description: "Returns the current news",
  execute: requestBody => {
    warframe.worldstate
      .news()
      .then(news => {
        const attachmets = [];
        news.forEach(item => {
          attachmets.push({
            fallback: item.message,
            title: item.message,
            title_link: item.link,
            footer: moment.unix(item.date).format("h:mm a, ddd D MMM")
          });
        });

        return messaging.sendSlashMessage(
          requestBody.response_url,
          "in_channel",
          "",
          attachmets
        );
      })
      .catch(error => handleError(error, requestBody));
  }
};
