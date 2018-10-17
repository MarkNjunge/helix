const warframe = require("./../../shared/warframe");
const messaging = require("./../messaging");
const { handleError } = require("./../");

module.exports = {
  name: "get",
  description: "Return the first item from the wiki",
  usage: "<item>",
  execute: requestBody => {
    const query = requestBody.text.split("get")[1].trim();

    warframe.wiki
      .getDetails(query)
      .then(result => {
        const responseTitle = `Here is the top result for *${query}*`;

        const attachments = [
          {
            fallback: result.title,
            title: result.title,
            text: result.description,
            title_link: result.url
          },
          {
            fallback: "Image",
            image_url: result.image_url
          }
        ];

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
