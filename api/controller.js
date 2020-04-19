const { dbConnect, disconnect } = require("./db");
const { validContributionBody } = require("../helpers");
const {
  addNewContribution,
  findContributionsExcludingIp,
} = require("./queries");

const addContribution = async (contributionData) => {
  console.warn(
    "HANDLER > addContribution > incoming contributionData",
    contributionData
  );

  await dbConnect().catch((e) => {
    throw new Error(e);
  });

  if (!validContributionBody(contributionData)) {
    console.warn("Invalid Contribution Body");
    throw new Error(400);
  }

  let newContribution = addNewContribution(contributionData);
  try {
    newContribution = await newContribution.save();
    disconnect();
  } catch (err) {
    throw new Error(500);
  }
  return newContribution;
};

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
