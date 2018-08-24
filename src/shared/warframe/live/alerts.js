const {alerts} = require("../worldstate");
const db = require("../../db");
const winston = require("winston");
const cron = require("node-cron");
const {sendRegularMessage} = require("../../../slack/messaging");
const {schedules} = require("./");

/**
 *
 * @param watchArray {Array<LiveReward>}
 * @returns {Promise<Array>}
 */
async function filterAlerts(watchArray) {
  const currentAlerts = await alerts();

  let alertUpdates = [];

  watchArray.forEach(({item}, index) => {
    let thisAlert = watchArray[index];
    let found = currentAlerts.find(({reward}) => reward.asString.toLowerCase().indexOf(item.toLowerCase()) !== -1);
    if (found) {
      thisAlert.expiry = found.expiry;
      thisAlert.mission = found;
      alertUpdates.push(thisAlert);
    }
  });

  return alertUpdates;
}

function sendAlertUpdate(rewardUpdate) {
  db.push(db.ALERTREF, {
    key: "sentList",
    value: rewardUpdate.mission
  });

  const alert = rewardUpdate.mission;

  let message = {
    title: `[Alert] ${alert.type} mission rewarding ${rewardUpdate.item} is Available`,
    fallback: alert.type,
    text: `${alert.node}${alert.archwing ? " (Archwing)" : " "}\n${alert.faction} level ${alert.minEnemyLevel} - ${alert.maxEnemyLevel}`,
    thumb_url: alert.reward.thumbnail,
    fields: [
      {
        title: "Rewards",
        value: alert.reward.asString.replace("cr", " credits")
      }
    ],
    footer: "Available until",
    ts: alert.expiry
  };

  sendRegularMessage(`Some ${rewardUpdate.item} reward is available`, rewardUpdate.user, true, [message])
    .then(() => winston.info(`Successfully sent an update: ${rewardUpdate.item}`))
    .catch(err => winston.error(err.message));
}

exports.task = cron.schedule(schedules.alerts, async () => {
  const watchList = db.get(db.ALERTREF, "watchList");
  const isWatching = db.get(db.ALERTREF, "isWatching");

  if (isWatching && watchList.length > 0) {
    const available = await filterAlerts(watchList);
    available.forEach((update) => {
      const dbVal = db.get(db.ALERTREF, "sentList");

      if (!dbVal.find(({expiry}) => expiry === update.mission.expiry)) {
        sendAlertUpdate(update);
      }
    });
  }
}, true);
