const express = require('express');
const messageRoute = require('./message.route');
const docsRoute = require('./docs.route');

const router = express.Router();

// Swagger routes
router.use('/docs', docsRoute);

// message API routes
router.use('/messages', messageRoute);

module.exports = router;
