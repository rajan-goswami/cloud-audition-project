const express = require('express');
const { Validator } = require('express-json-validator-middleware');
const { createMessageSchema, updateMessageSchema, messageIdSchema } = require('../../validations/requests.schema');
const messageController = require('../../controllers/message.controller');

const router = express.Router();
const { validate } = new Validator();

router
  .route('/')
  .post(validate({ body: createMessageSchema }), messageController.createMessage)
  .get(messageController.getMessages);

router
  .route('/:messageId')
  .get(validate({ params: messageIdSchema }), messageController.getMessage)
  .patch(validate({ body: updateMessageSchema, params: messageIdSchema }),
    messageController.updateMessage)
  .delete(validate({ params: messageIdSchema }), messageController.deleteMessage);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management and retrieval
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a message
 *     description: API to add a new message with palindrome flag.
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *             example:
 *               content: Malayalam
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Message'
 *
 *   get:
 *     summary: Get all messages
 *     description: API to get all messages.
 *     tags: [Messages]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Get a message
 *     description: Get a message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Message'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a message
 *     description: API to update a message.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *             example:
 *               content: Hindi
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Message'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a message
 *     description: API to delete a message by id.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message id
 *     responses:
 *       "200":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
