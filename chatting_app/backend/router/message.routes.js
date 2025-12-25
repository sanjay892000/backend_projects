
const express = require('express');
const isVerifyAuth = require('../middleware/isVerifyAuth');
const { sendMessage, getMessages } = require('../controllers/message.controllers');
const router = express.Router();

router.get('/:id', isVerifyAuth, getMessages);

router.post('/send/:id', isVerifyAuth, sendMessage);



module.exports = router;