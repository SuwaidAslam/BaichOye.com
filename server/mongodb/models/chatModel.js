import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    ad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ads',
      required: true,
    },
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: { type: Date, default: Date.now }
  });

const Chats = mongoose.model('Chats', chatSchema);

export default Chats;