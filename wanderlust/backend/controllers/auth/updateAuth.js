require('dotenv').config();
const registerModel = require('../../schema/register.model');
const bcrypt = require('bcryptjs');

const updateFun = async (req, res) => {
    try {
        const userId = req.user;
        const { name, email, phone, password } = req.body;

        const user = await registerModel.findById(userId);
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Save the updated user
        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            auth: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

module.exports = updateFun;