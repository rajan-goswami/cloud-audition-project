const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

// To normalize JSON output by excluding _v, renaming _id to id
mongoose.plugin(toJson);

const messageSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isPalindrome: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
