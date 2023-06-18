import express from "express";
import {
    makeTransaction,
    makeTransactionFromWallet,
    getTransactions,
    getPendingTransactions,
    approveTransaction,
    rejectTransaction,
    getBalance,
    withdrawMoney,
    depositMoney, 
} from '../controllers/walletController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post('/makeTransaction', authUser, makeTransaction)
router.post('/makeTransactionFromWallet', authUser, makeTransactionFromWallet)
router.get('/getTransactions', authUser, getTransactions)
router.get('/getPendingTransactions', getPendingTransactions)
router.post('/approveTransaction', approveTransaction)
router.post('/rejectTransaction', rejectTransaction)
router.get('/getWalletBalance', authUser, getBalance)
router.post('/depositMoney', authUser, depositMoney)
router.post('/withdrawMoney', authUser, withdrawMoney)
router.post('/payFromWallet')

export default router;
