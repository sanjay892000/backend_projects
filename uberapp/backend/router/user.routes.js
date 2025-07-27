const express = require('express');
const router = express.Router()
const { body } = require('express-validator')
const { register, login, getProfile, updateProfile, deleteProfile } = require('../controllers/user.controller');
const isVerifyAuth = require('../middleware/auth.middleware');



router.post('/register', [
    body('firstname').isLength({ min: 3 }).withMessage('first-name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('age').notEmpty().withMessage('Age is required').isInt({ min: 18, max: 50 }).withMessage('Age must be between 18 and 50'),
    body('password').not().isEmpty().withMessage('Password is required')
], register);


router.post('/login', [
    body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('password').not().isEmpty().withMessage('Password is required')
], login);

router.get('/profile', isVerifyAuth, getProfile);

router.put('/profile/update', isVerifyAuth, updateProfile);

router.delete('/delete', deleteProfile)

module.exports = router;
