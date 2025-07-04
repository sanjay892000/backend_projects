require('dotenv').config();
const registerModel = require('../../schema/register.model');


const deleteAuth = async (req, res) => {
    try {
        const userId = req.user;
        const auth = await registerModel.findByIdAndDelete(userId);

        res.status(200).json({
            message: 'User deleted successfully',
            success: true,
            auth: auth
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}

module.exports = deleteAuth;