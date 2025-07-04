const express = require('express');
const router = express.Router();
const contactUs = require('../controllers/contact/contactUs');

router.post('/contact', contactUs);

module.exports = router;