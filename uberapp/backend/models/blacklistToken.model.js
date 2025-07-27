const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires:'86400' // 24 hr in in sec
    }
});


module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);