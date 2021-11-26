const mongoose = require('mongoose');
const Message = require('../../src/models/message.model');

const messageOne = {
  _id: mongoose.Types.ObjectId(),
  content: 'Malayalam',
  isPalindrome: true,
};

const messageTwo = {
  _id: mongoose.Types.ObjectId(),
  content: 'Hindi',
  isPalindrome: false,
};

const insertMessages = async (messages) => {
  await Message.insertMany(messages.map((message) => ({ ...message })));
};

module.exports = {
  messageOne,
  messageTwo,
  insertMessages,
};
