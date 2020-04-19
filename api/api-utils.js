const moment = require("moment");

const generateTimeStamp30DaysAgo = () =>
  moment().subtract(30, "days").format().slice(0, 10);

const validContributionBody = (contributionBody) => {
  if (!contributionBody) return false;
  if (!contributionBody.canvas || !contributionBody.color) return false;

  return true;
};

module.exports = {
  generateTimeStamp30DaysAgo,
  validContributionBody,
};
