import moment from "moment";

/**
 * @function generateTimeStamp30DaysAgo generates a timestamp 30 days before cthe current time using the library "moment"
 *
 * @returns {object} Returns timestamp <YYYY-MM-DDT0000:00:00Z>
 */

const generateTimeStamp30DaysAgo = () =>
  moment().subtract(30, "days").format().slice(0, 10);

/**
 * @function validatecontributionBody validates all key/value pairs are present before attempting to write a new message to file
 *
 * @returns {boolean} Returns true if body is valid
 */

const validContributionBody = (contributionBody) => {
  if (!contributionBody) return false;
  if (
    !contributionBody.to ||
    !contributionBody.from ||
    !contributionBody.message
  )
    return false;
  if (
    Object.keys(contributionBody).find(
      (key) => typeof contributionBody[key] !== "string"
    )
  )
    return false;
  return true;
};

module.exports = {
  generateTimeStamp30DaysAgo,
  validContributionBody,
};
