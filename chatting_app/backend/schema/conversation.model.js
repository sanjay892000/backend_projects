
const monggoose = require('mongoose');

const messageSchema = new monggoose.Schema({
    participants: [{
        type: monggoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: monggoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }]
}, { timestamps: true });

const Conversation = monggoose.model('Conversation', messageSchema);
module.exports = Conversation;