
const express = require('express');
const isVerifyAuth = require('../middleware/isVerifyAuth');
const UserModel = require('../schema/user.model');
const router = express.Router();

router.get('/', isVerifyAuth, async (req, res) => {

    const loggedInUserId = req.user;

    try {
        const filterUsers = await UserModel.find({ _id: { $ne: loggedInUserId } }).select('-password');

        return res.status(200).json(filterUsers);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error',
            success: false,
            error: error.message
        });
    }

});

module.exports = router;