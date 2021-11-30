const httpStatus = require('http-status');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const messageService = require('../services/message.service');

/**
 * controller for API: POST /messages
 */
const createMessage = asyncHandler(async (req, res) => {
  const message = await messageService.createMessage(req.body);
  res.status(httpStatus.CREATED).send(message);
});

/**
 * controller for API: GET /messages
 */
const getMessages = asyncHandler(async (req, res) => {
  const messages = await messageService.queryMessages();
  res.send({ results: messages });
});

/**
 * controller for API: GET /messages/:messageId
 */
const getMessage = asyncHandler(async (req, res) => {
  const message = await messageService.getMessageById(req.params.messageId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
  }
  res.send(message);
});

/**
 * controller for API: PATCH /messages/:messageId
 */
const updateMessage = asyncHandler(async (req, res) => {
  const message = await messageService.updateMessageById(req.params.messageId, req.body);
  res.send(message);
});

/**
 * controller for API: DELETE /messages/:messageId
 */
const deleteMessage = asyncHandler(async (req, res) => {
  await messageService.deleteMessageById(req.params.messageId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
};
