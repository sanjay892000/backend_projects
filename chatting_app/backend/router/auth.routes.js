const express = require('express');
const { loginAuth, signupAuth, getAuth, updateAuth, deleteAuth } =  require('../controllers/auth.controllers');
const router = express.Router();
const isVerifyAuth = require('../middleware/isVerifyAuth');


router.post('/signup', signupAuth);
router.post('/login', loginAuth);
router.get('/profile', isVerifyAuth, getAuth);

router.put('/update', isVerifyAuth, updateAuth);
router.delete('/delete', isVerifyAuth, deleteAuth);

module.exports = router;