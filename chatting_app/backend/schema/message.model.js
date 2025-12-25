
const monggoose = require('mongoose');

const messageSchema = new monggoose.Schema({
    senderId: {
        type: monggoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: monggoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Message = monggoose.model('Message', messageSchema);
module.exports = Message;