const warframe = require("./../../shared/warframe");
const messaging = require("./../messaging");
const { handleError } = require("./../");

module.exports = {
  name: "search",
  description: "Searches the wiki",
  usage: "<item>",
  execute: requestBody => {
    const query = requestBody.text.split(":")[1];

    warframe.wiki
      .search(query)
      .then(results => {
        const attachments = [];

        results.forEach(result => {
          attachments.push({
            fallback: result.title,
            title: result.title,
            text: result.description,
            title_link: result.url
          });
        });

        const responseTitle = `Here are the results for *${query}*`;

        return messaging.sendSlashMessage(
          requestBody.response_url,
          "in_channel",
          responseTitle,
          attachments
        );
      })
      .catch(error => handleError(error, requestBody, query));
  }
};
