require('dotenv').config();
const registerModel = require('../../schema/register.model');


const deleteAuth = async (req, res) => {
    try {
        const userId = req.user;
        const auth = await registerModel.findByIdAndDelete(userId);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            auth: auth
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

module.exports = deleteAuth;