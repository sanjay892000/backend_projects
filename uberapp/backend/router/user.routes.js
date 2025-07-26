const express = require('express');
const router = express.Router()
const { body } = require('express-validator')
const { register, login, getUser, updateUser, deleteUser } = require('../controllers/user.controller');



router.post('/register', [
    body('fullname.firstname').isLength({ min: 6 }).withMessage('first-name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('age').notEmpty().withMessage('Age is required').isInt({ min: 18, max: 50 }).withMessage('Age must be between 18 and 50'),
    body('password').not().isEmpty().withMessage('Password is required')
], register);


router.post('/login', login);

router.get('/user', getUser);

router.put('/update', updateUser);

router.delete('/delete', deleteUser)

module.exports = router;
