import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            ref: 'User',
            required: true,
        }
    },
    { timestamps: true }
)

const Chats = mongoose.model('Chats', ChatSchema);

export default Chats;