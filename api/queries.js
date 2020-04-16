import { Contribution } from "../db";
import { generateTimeStamp30DaysAgo } from "api-utis";
import keys from "./responseKeys.query";

/**
 * @function getAllContributionsQuery generates a query for all messages sent within 30 days, limited to 100
 *
 * @returns {object} Returns mongoose query for the messages
 */

const getAllContributionsQuery = async () =>
  Contribution.find({}, keys)
    .where("createdAt")
    .gte(generateTimeStamp30DaysAgo())
    .limit(100);

/**
 * @function insertNewContribution generates new model for a message from the imported mongoose schema
 *
 * @param contributionData {object} Data about message from request { to: <string>, from: <string>, message: <string> }
 *
 * @returns {object} Returns mongoose model for a message
 */

const insertNewContribution = (contributionData) =>
  new Contribution(contributionData);

module.exports = { getAllContributionsQuery, insertNewContribution };
