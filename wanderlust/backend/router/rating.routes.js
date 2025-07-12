const express = require('express');
const router = express.Router();
const isVerifyAuth = require('../middleware/isVerifyAuth');
const addrating = require('../controllers/rating/addrating');


router.post('/addrating/:postid', isVerifyAuth, addrating);

module.exports = router;