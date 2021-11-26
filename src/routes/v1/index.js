const express = require('express');
const messageRoute = require('./message.route');
const docsRoute = require('./docs.route');

const router = express.Router();

router.use('/docs', docsRoute);
router.use('/messages', messageRoute);

module.exports = router;
