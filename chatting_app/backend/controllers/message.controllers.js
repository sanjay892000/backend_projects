const ConversationModel = require("../schema/conversation.model");
const MessageModel = require("../schema/message.model");
const UserModel = require("../schema/user.model");

const sendMessage = async (req, res) => {
    const { message } = req.body;
    const senderId = req.user;
    const receiverId = req.params.id;
    console.log(message, receiverId, senderId)

    try {

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const receiverUser = await UserModel.findById(receiverId);
        if (!receiverUser) {
            return res.status(404).json({
                success: false,
                message: "Receiver not found"
            });
        }

        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = new ConversationModel({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new MessageModel({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        /* await newMessage.save();
        await conversation.save(); */

        await Promise.all([newMessage.save(), conversation.save()]);

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }

}

const getMessages = async (req, res) => {

    const senderId = req.user;
    const receiverId = req.params.id;

    try {

        const receiverUser = await UserModel.findById(receiverId);
        if (!receiverUser) {
            return res.status(404).json({
                success: false,
                message: "Receiver not found"
            });
        }

        const conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages');
        
        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "No conversation found"
            });
        }
        res.status(200).json(conversation.messages);
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }

}

module.exports = {
    sendMessage,
    getMessages
};