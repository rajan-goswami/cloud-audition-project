// Input validation schema for POST /messages
const createMessageSchema = {
  type: 'object',
  required: ['content'],
  properties: {
    content: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

// Input validation schema for PATCH /messages/:messageId
const updateMessageSchema = {
  type: 'object',
  required: ['content'],
  properties: {
    content: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

// Param validatiojn schema for GET /messages/:messageId, PATCH /messages/:messageId
// DELETE /messages/:messageId
const messageIdSchema = {
  type: 'object',
  required: ['messageId'],
  properties: {
    messageId: {
      type: 'string',
      pattern: '^[0-9a-fA-F]{24}$',
    },
  },
  additionalProperties: false,
};

module.exports = {
  createMessageSchema,
  updateMessageSchema,
  messageIdSchema,
};
