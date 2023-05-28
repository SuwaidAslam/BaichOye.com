import WalletModel from '../mongodb/models/walletModel.js';
import asyncHandler from 'express-async-handler';


// Create a transaction
export const makeTransaction = asyncHandler(async (req, res) => {
    try {
        const { buyerId, sellerId, adId, amount } = req.body;

        // Create a new transaction object
        const transaction = {
            buyerId,
            sellerId,
            adId,
            amount,
            status: 'Pending', // Assuming the transaction starts as pending
        };

        // Add the transaction to the buyer's wallet
        const buyerWallet = await WalletModel.findOneAndUpdate(
            { userId: buyerId },
            { $push: { transactions: transaction } },
            { new: true }
        );

        // Update the wallet balance
        buyerWallet.balance -= amount;

        // Save the updated wallet document
        await buyerWallet.save();

        // Update the seller's wallet
        const sellerWallet = await WalletModel.findOneAndUpdate(
            { userId: sellerId },
            { $push: { transactions: transaction } },
            { new: true }
        );

        // Update the seller's wallet balance
        sellerWallet.balance += amount;

        // Save the updated seller's wallet document
        await sellerWallet.save();

        res.status(200).json({ message: 'Transaction created successfully' });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'An error occurred while creating the transaction' });
    }
});

// get the total amoung where the transaction is of type credit
export const getCreditAmount = asyncHandler(async (req, res) => {

    try {
        const { userId } = req.params;
        const wallet = await WalletModel.findOne({ userId });
        const creditAmount = wallet.transactions.reduce((total, transaction) => {
            if (transaction.type === 'credit') {
                total += transaction.amount;
            }
            return total;
        }, 0);
        res.status(200).json({ creditAmount });
    } catch (error) {
        console.error('Error getting credit amount:', error);
        res.status(500).json({ error: 'An error occurred while getting the credit amount' });
    }
}
);

// get the total amoung where the transaction is of type debit
export const getDebitAmount = asyncHandler(async (req, res) => {

    try {
        const { userId } = req.params;
        const wallet = await WalletModel.findOne({ userId });
        const debitAmount = wallet.transactions.reduce((total, transaction) => {
            if (transaction.type === 'debit') {
                total += transaction.amount;
            }
            return total;
        }, 0);
        res.status(200).json({ debitAmount });
    } catch (error) {
        console.error('Error getting debit amount:', error);
        res.status(500).json({ error: 'An error occurred while getting the debit amount' });
    }
}
);

// get the total amoung where the transaction is of type refund
export const getRefundAmount = asyncHandler(async (req, res) => {
    
    try {
        const { userId } = req.params;
        const wallet = await WalletModel.findOne({ userId });
        const refundAmount = wallet.transactions.reduce((total, transaction) => {
            if (transaction.type === 'refund') {
                total += transaction.amount;
            }
            return total;
        }, 0);
        res.status(200).json({ refundAmount });
    } catch (error) {
        console.error('Error getting refund amount:', error);
        res.status(500).json({ error: 'An error occurred while getting the refund amount' });
    }
}
);

