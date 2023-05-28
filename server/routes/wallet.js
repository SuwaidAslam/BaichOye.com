import express from "express";
import {
    makeTransaction,
} from '../controllers/walletController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post('/makeTransaction', authUser, makeTransaction)

export default router;
