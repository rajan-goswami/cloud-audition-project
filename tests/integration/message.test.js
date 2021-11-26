const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const Message = require('../../src/models/message.model');
const { messageOne, messageTwo, insertMessages } = require('../fixtures/message.fixture');

setupTestDB();

describe('Message routes', () => {
  describe('POST /v1/messages', () => {
    it('should return 201 and successfully create new message with isPalindrome = true', async () => {
      const newMessage = {
        content: 'Malayalam',
      };

      const res = await request(app)
        .post('/v1/messages')
        .send(newMessage)
        .expect(httpStatus.CREATED);

      expect(res.body.id).to.not.be.undefined;
      expect(res.body.content).to.be.equal(newMessage.content);
      expect(res.body.isPalindrome).to.be.true;

      const dbMessage = await Message.findById(res.body.id, 'content isPalindrome').lean();

      expect(dbMessage).to.deep.include({
        content: newMessage.content,
        isPalindrome: true,
      });
    });

    it('should return 201 and successfully create new message with isPalindrome = false', async () => {
      const newMessage = {
        content: 'Hindi',
      };

      const res = await request(app)
        .post('/v1/messages')
        .send(newMessage)
        .expect(httpStatus.CREATED);

      expect(res.body.id).to.not.undefined;
      expect(res.body.content).to.be.equal(newMessage.content);
      expect(res.body.isPalindrome).to.be.false;

      const dbMessage = await Message.findById(res.body.id, 'content isPalindrome').lean();

      expect(dbMessage).to.deep.include({
        content: newMessage.content,
        isPalindrome: false,
      });
    });

    it('should return 400 if invalid request body is provided', async () => {
      const newMessage = {};

      await request(app)
        .post('/v1/messages')
        .send(newMessage)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /v1/messages', () => {
    it('should return 200', async () => {
      await insertMessages([messageOne, messageTwo]);

      const res = await request(app)
        .get('/v1/messages')
        .send()
        .expect(httpStatus.OK);

      expect(res.body.results).to.have.length(2);

      expect(res.body.results[0]).to.deep.equal({
        id: messageOne._id.toHexString(),
        content: messageOne.content,
        isPalindrome: messageOne.isPalindrome,
      });
      expect(res.body.results[1]).to.deep.equal({
        id: messageTwo._id.toHexString(),
        content: messageTwo.content,
        isPalindrome: messageTwo.isPalindrome,
      });
    });
  });

  describe('GET /v1/messages/:messageId', () => {
    it('should return 200 and the message object if data is ok', async () => {
      await insertMessages([messageOne]);

      const res = await request(app)
        .get(`/v1/messages/${messageOne._id}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).to.deep.equal({
        id: messageOne._id.toHexString(),
        content: messageOne.content,
        isPalindrome: messageOne.isPalindrome,
      });
    });

    it('should return 404 error if message is not found', async () => {
      await insertMessages([messageOne]);

      await request(app)
        .get(`/v1/messages/${messageTwo._id}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });

    it('should return 400 error if given messageId is invalid', async () => {
      await insertMessages([messageOne]);

      await request(app)
        .get(`/v1/messages/22222222`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('DELETE /v1/messages/:messageId', () => {
    it('should return 204 if data is ok', async () => {
      await insertMessages([messageOne]);

      await request(app)
        .delete(`/v1/messages/${messageOne._id}`)
        .send()
        .expect(httpStatus.NO_CONTENT);

      const dbMessage = await Message.findById(messageOne._id);
      expect(dbMessage).to.be.null;
    });

    it('should return 404 error if message is not found', async () => {
      await insertMessages([messageOne]);

      await request(app)
        .delete(`/v1/messages/${messageTwo._id}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });

    it('should return 400 error if given messageId is invalid', async () => {
      await insertMessages([messageOne]);

      await request(app)
        .delete(`/v1/messages/22222222`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('PATCH /v1/messages/:messageId', () => {
    it('should return 200 and successfully update message if data is ok', async () => {
      await insertMessages([messageOne]);
      const updateBody = {
        content: 'Updated Message',
      };

      const res = await request(app)
        .patch(`/v1/messages/${messageOne._id}`)
        .send(updateBody)
        .expect(httpStatus.OK);

      expect(res.body).to.deep.include({
        id: messageOne._id.toHexString(),
        content: updateBody.content,
        isPalindrome: false,
      });

      const dbMessage = await Message.findById(messageOne._id, 'content isPalindrome').lean();

      expect(dbMessage).to.be.not.undefined;
      expect(dbMessage).to.deep.include({
        content: updateBody.content,
        isPalindrome: false,
      });
    });

    it('should return 400 if invalid message is provided', async () => {
      await insertMessages([messageOne]);
      const updateBody = {};

      await request(app)
        .patch(`/v1/messages/${messageTwo._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 404 if message is not found', async () => {
      await insertMessages([messageOne]);
      const updateBody = {
        content: 'Updated Message',
      };

      await request(app)
        .patch(`/v1/messages/${messageTwo._id}`)
        .send(updateBody)
        .expect(httpStatus.NOT_FOUND);
    });

    it('should return 400 error if given messageId is invalid', async () => {
      await insertMessages([messageOne]);

      await request(app)
        .patch(`/v1/messages/22222222`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
