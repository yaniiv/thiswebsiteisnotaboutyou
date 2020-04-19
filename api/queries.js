const { Contribution } = require("./db");
const { generateTimeStamp30DaysAgo } = require("./api-utils");

const keys = "-_id ip canvas color createdAt";

const findContributionsExcludingIp = async (ip) => {
  return Contribution.find({}, keys)
    .where("ip")
    .ne(ip)
    .limit(111)
    .sort("-createdAt");
};

const addNewContribution = (contributionData) => {
  return new Contribution(contributionData);
};

module.exports = { findContributionsExcludingIp, addNewContribution };
