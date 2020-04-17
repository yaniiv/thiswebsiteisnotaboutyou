const { dbConnect, disconnect } = require("./db");
const { validContributionBody } = require("./api-utils");
const { addNewContribution, getAllContributions } = require("./queries");
/**
 * @function sendMessage Connects to database and posts a new message with to and from data
 *
 * @param contributionData {object} Data about message from request { to: <string>, from: <string>, message: <string> }
 *
 * @returns {bool} Returns true if insert succeeeds
 */

const addContribution = async (contributionData) => {
  console.warn("addContribution");

  await dbConnect().catch((e) => {
    console.warn("dbConnect cat", e);
    throw new Error(e);
  });

  // if (!validContributionBody(contributionData)) throw new Error(400);

  let newContribution = addNewContribution(contributionData);
  console.warn("newContribution", newContribution);
  try {
    newContribution = await newContribution.save();
    disconnect();
  } catch (err) {
    throw new Error(500);
  }
  return { id: newContribution.id };
};

/**
 * @function queryForAllMessages Connect to database, query for all messages in database sent within 30 days, limited to 100 messages, then close database
 *
 * @param none
 *
 * @returns {object[]} Returns an array of message objects [ { to: <string>, from: <string>, message: <string>, createdAt: <timestamp>}]
 */

const queryForAllContributions = async () => {
  await dbConnect().catch((e) => {
    throw new Error(e);
  });
  return getAllContributions().then((messages, err) => {
    console.log("messages", messages);
    if (err) throw new Error(err);
    disconnect();
    return messages;
  });
};

module.exports = {
  addContribution,
  queryForAllContributions,
};
