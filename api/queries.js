const { Contribution } = require("./db");
const { generateTimeStamp30DaysAgo } = require("./api-utils");

/**
 * @function getAllContributions generates a query for all messages sent within 30 days, limited to 100
 *
 * @returns {object} Returns mongoose query for the messages
 */
const keys = "-_id ip canvas color createdAt";

const findContributionsExcludingIp = async (ip) => {
  return Contribution.find({}, keys).where("ip").ne(ip).limit(111);
};

/**
 * @function addNewContribution generates new model for a message from the imported mongoose schema
 *
 * @param contributionData {object} Data about message from request { to: <string>, from: <string>, message: <string> }
 *
 * @returns {object} Returns mongoose model for a message
 */

const addNewContribution = (contributionData) => {
  return new Contribution(contributionData);
};

module.exports = { findContributionsExcludingIp, addNewContribution };
