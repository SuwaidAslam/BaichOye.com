import chatModel from '../mongodb/models/chatModel.js';
import asyncHandler from 'express-async-handler';
import AuthModel from '../mongodb/models/authModel.js';
import adModel from '../mongodb/models/adModel.js';

// send chat
export const sendChat = asyncHandler(async (req, res) => {
    try {
        const { senderId, recipientId, adId, content } = req.body;

        // Check if the chat exists between the sender and recipient for the given ad
        let chat = await chatModel.findOne({
            participants: { $all: [senderId, recipientId] },
            ad: adId,
        });

        if (!chat) {
            // Create a new chat if it doesn't exist
            chat = new chatModel({
                participants: [senderId, recipientId],
                ad: adId,
                messages: [],
            });
        }

        // Add the new message to the chat
        const newMessage = {
            sender: senderId,
            content: content,
        };
        chat.messages.push(newMessage);

        // Save the updated chat
        await chat.save();

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send message' });
    }
})


// my chats
export const myChats = asyncHandler(async (req, res) => {
    try {
        const currentUser = req.user; // Assuming you have implemented user authentication and can access the current user

        // Find all chats where the current user is a participant
        const chats = await chatModel.find({ participants: currentUser._id })
        .populate('participants', '-password')
        .populate('ad', 'title images');

        res.status(200).json({ chats });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve chats' });
    }
})


// particular chats
export const chatMessages = asyncHandler(async (req, res) => {
    try {
        const { senderId, recipientId, adId } = req.query;

        // Check if the chat exists between the sender and recipient for the given ad
        const chat = await chatModel.findOne({
            participants: { $all: [senderId, recipientId] },
            ad: adId,
        })
        // .populate('messages.sender', '-password');

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json({ messages: chat.messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve messages' });
    }
})