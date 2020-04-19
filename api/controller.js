const { dbConnect, disconnect } = require("./db");
const { validContributionBody } = require("./api-utils");
const {
  addNewContribution,
  findContributionsExcludingIp,
} = require("./queries");
/**
 * @function sendMessage Connects to database and posts a new message with to and from data
 *
 * @param contributionData {object} Data about message from request { to: <string>, from: <string>, message: <string> }
 *
 * @returns {bool} Returns true if insert succeeeds
 */

const addContribution = async (contributionData) => {
  await dbConnect().catch((e) => {
    throw new Error(e);
  });

  if (!validContributionBody(contributionData)) throw new Error(400);

  console.warn("contributionData", contributionData);

  let newContribution = addNewContribution(contributionData);
  try {
    newContribution = await newContribution.save();
    disconnect();
  } catch (err) {
    throw new Error(500);
  }
  return newContribution;
};

/**
 * @function queryForAllMessages Connect to database, query for all messages in database sent within 30 days, limited to 100 messages, then close database
 *
 * @param none
 *
 * @returns {object[]} Returns an array of message objects [ { to: <string>, from: <string>, message: <string>, createdAt: <timestamp>}]
 */

const getAllContributions = async (ip) => {
  console.warn("getAllContributions ip", ip);
  await dbConnect().catch((e) => {
    throw new Error(e);
  });
  return findContributionsExcludingIp(ip).then((messages, err) => {
    if (err) throw new Error(err);
    disconnect();
    return messages;
  });
};

module.exports = {
  addContribution,
  getAllContributions,
};
