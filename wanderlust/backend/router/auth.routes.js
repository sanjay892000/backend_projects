const express = require('express');
const router = express.Router();
const signup = require('../controllers/auth/signup');
const login = require('../controllers/auth/login');
const getAuth = require('../controllers/auth/getAuth');
const updateAuth = require('../controllers/auth/updateAuth');
const deleteAuth = require('../controllers/auth/deleteAuth');
const isVerifyAuth = require('../middleware/isVerifyAuth');


router.post('/signup', signup);
router.post('/login', login);
router.get('/getuser', isVerifyAuth, getAuth);
router.put('/updateuser', isVerifyAuth, updateAuth);
router.delete('/deleteuser', isVerifyAuth, deleteAuth);