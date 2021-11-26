const mongoose = require('mongoose');
const httpStatus = require('http-status');
const Message = require('../models/message.model');
const ApiError = require('../utils/ApiError');
const { checkPalindrome } = require('../utils/text.util');
const { logger } = require('../config/logger');

/**
 * Create a message
 *
 * @param {Object} messageBody
 * @returns {Promise<Message>}
 */
const createMessage = async (messageBody) => {
  const isPalindrome = checkPalindrome(messageBody.content);
  const result = await Message.create({ ...messageBody, isPalindrome });

  return {
    id: result.id,
    content: result.content,
    isPalindrome: result.isPalindrome,
  };
};

/**
 * Query for messages
 *
 * @returns {Promise<QueryResult>}
 */
const queryMessages = async () => Message.find({}, '_id content isPalindrome');

/**
 * Get message by id
 *
 * @param {ObjectId} id
 * @returns {Promise<Message>}
 */
const getMessageById = async (id) => Message.findById(id, '_id content isPalindrome');

/**
 * Update message by id
 *
 * @param {ObjectId} messageId
 * @param {Object} updateBody
 * @returns {Promise<Message>}
 */
const updateMessageById = async (messageId, updateBody) => {
  const message = await Message.findById(messageId, '_id content isPalindrome');
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
  }
  Object.assign(message, updateBody);
  message.isPalindrome = checkPalindrome(message.content);
  await message.save();

  return message;
};

/*const updateMessageById = async (messageId, updateBody) => {
  // Start Mongodb transaction session
  const session = await mongoose.startSession();
  try {
    // Transaction block
    await session.withTransaction(async () => {
      const message = await Message.findById(messageId, '_id content isPalindrome', { session });
      if (!message) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
      }
      Object.assign(message, updateBody);
      message.isPalindrome = checkPalindrome(message.content);
      await message.save();

      return message;
    });

  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    } else {
      logger.error(err);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update message');
    }
  } finally {
    // Always end session
    session.endSession();
  }
};*/

/**
 * Delete message by id
 *
 * @param {ObjectId} messageId
 * @returns {Promise<Message>}
 */
const deleteMessageById = async (messageId) => {
  const message = await getMessageById(messageId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
  }
  await message.remove();
};

module.exports = {
  createMessage,
  queryMessages,
  getMessageById,
  updateMessageById,
  deleteMessageById,
};
