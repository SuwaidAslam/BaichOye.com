import chatModel from '../mongodb/models/chatModel.js';
import asyncHandler from 'express-async-handler';
import AuthModel from '../mongodb/models/authModel.js';
import adModel from '../mongodb/models/adModel.js';

// send chat
export const sendChat = asyncHandler(async (req, res) => {
    const user = req.user

    const { receiver, ad, message } =
        req.body

    const data = {
        sender: user._id,
        receiver,
        ad,
        message,
    }

    const chat = new chatModel(data)

    await chat.save()
    if (chat) {
        res.json({ successMsg: 'Your chat has been Sent' })

    } else {
        throw new Error('could not send your chat')
    }
})


// my chats
export const myChats = asyncHandler(async (req, res) => {
    const user = req.user
    const chats = await chatModel.aggregate(
        [
            {
                $match: { $or: [{ sender: user._id }, { receiver: user._id }] }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "sender",
                    foreignField: "_id",
                    as: "sender"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "receiver",
                    foreignField: "_id",
                    as: "receiver"
                }
            },
            {
                $lookup: {
                    from: "ads",
                    localField: "ad",
                    foreignField: "_id",
                    as: "ad"
                }
            },
            {
                $group: {
                    _id: "$ad",
                    "messages": {
                        "$push": {
                            "sender": "$sender",
                            "receiver": "$receiver",
                            "createdAt": "$createdAt",
                            "updatedAt": "$updatedAt"
                        },
                    }
                },

            }
        ]
    )

    if (!chats) {
        throw new Error('Something went wrong')
    }
    res.json(chats)
})


// particular chats
export const chatMessages = asyncHandler(async (req, res) => {
    const { receiver, sender, ad } = req.body
    const chats = await chatModel.find(
        {
            $or: [
                {
                    $and: [
                        { sender: sender },
                        { receiver: receiver },
                        { ad: ad }
                    ]
                },
                {
                    $and: [
                        { sender: receiver },
                        { receiver: sender },
                        { ad: ad }
                    ]
                }
            ]
        }
    )

    if (!chats) {
        throw new Error('Something went wrong')
    }
    res.json(chats)
})