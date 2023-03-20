import express from "express";
import {
    sendChat,
    myChats,
    chatMessages,
} from '../controllers/chatController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post('/send', authUser, sendChat)
router.get('/myChats', authUser, myChats)
router.post('/chatMessages', authUser, chatMessages)
// router.get('/chats/:id', authUser, myChats)
// router.post('/item/user', itemUser)
// router.get('/chat/:id', authUser, getChat)
// router.put('/item/update/:id', authUser, upload, multerMiddleware, updateAd)
// router.delete('/item/delete/:id', authUser, deleteAd)
// router.get('/myads', authUser, myads)


export default router;
