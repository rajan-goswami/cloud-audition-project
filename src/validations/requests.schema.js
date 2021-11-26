const createMessageSchema = {
    type: "object",
    required: ["content"],
    properties: {
        content: {
            type: "string",
        }
    },
    additionalProperties: false
};

const updateMessageSchema = {
    type: "object",
    required: ["content"],
    properties: {
        content: {
            type: "string",
        }
    },
    additionalProperties: false
};

const messageIdSchema = {
    type: "object",
    required: ["messageId"],
    properties: {
        messageId: {
            type: "string",
            pattern: '^[0-9a-fA-F]{24}$'
        }
    },
    additionalProperties: false
};


module.exports = {
    createMessageSchema,
    updateMessageSchema,
    messageIdSchema
}