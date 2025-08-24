const express = require('express');
const router = express.Router()
const { body } = require('express-validator')
const { register, login, getProfile, updateProfile, deleteProfile, logout } = require('../controllers/captain.controller');
const isVerifyAuth = require('../middleware/auth.middleware');


router.post('/register', [
    body('firstname').isLength({ min: 3 }).withMessage('first-name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('age').notEmpty().withMessage('Age is required').isInt({ min: 18, max: 50 }).withMessage('Age must be between 18 and 50'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('vehicle.color').notEmpty().withMessage('vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('vehicle plate is required'),
    body('vehicle.capacity').notEmpty().withMessage('vehicle type is required').isInt({min:1}).withMessage("Capacity must be atleast 1"),
    body('vehicle.vehicleType').notEmpty().withMessage('vehicle type is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
], register);


router.post('/login', [
    body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('password').not().isEmpty().withMessage('Password is required')
], login);

router.get('/profile/logout', isVerifyAuth, logout);

router.get('/profile', isVerifyAuth, getProfile);

router.put('/profile/update', isVerifyAuth, updateProfile);

router.delete('/profile/delete', isVerifyAuth, deleteProfile)

module.exports = router;