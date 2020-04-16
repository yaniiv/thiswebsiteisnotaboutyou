import { dbConnect, disconnect } from "../dao";
import { insertNewContribution } from "../queries/insertNewMessage.query";
import { updateMessage } from "../queries/updateMessage.query";
import { validMessageBody, validReaction, validMessageId } from "./api-utils";

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

  // if (!validMessageBody(messageData)) throw new Error(400)

  let newMessage = insertNewMessage(messageData);
  try {
    newMessage = await newMessage.save();
    disconnect();
  } catch (err) {
    throw new Error(500);
  }
  return { id: newMessage.id };
};

module.exports = {
  addContribution,
};
