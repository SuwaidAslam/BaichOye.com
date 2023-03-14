import chatModel from '../mongodb/models/chatModel.js';
import asyncHandler from 'express-async-handler';
import AuthModel from '../mongodb/models/authModel.js';

// send chat
export const sendChat = asyncHandler(async (req, res) => {
    
    const { sender, receiver, message} =
        req.body

    const data = {
        sender,
        receiver,
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

// // my chats
// export const myChats = asyncHandler(async (req, res) => {
//     const user = req.user
//     // const ads = await AdModel.find({ user: user.id }).select(
//     //     'title price images createdAt'
//     // )
//     const ads = await AdModel.find({ user: user.id })

//     if (!ads) {
//         throw new Error('Something went wrong')
//     }

//     res.json(ads)
// })