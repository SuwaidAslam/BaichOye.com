import WalletModel from '../mongodb/models/walletModel.js';
import asyncHandler from 'express-async-handler';
import AdModel from '../mongodb/models/adModel.js';
import TransactionModel from '../mongodb/models/transactionModel.js';




// Create a transaction
export const makeTransaction = asyncHandler(async (req, res) => {
  try {
    const { buyerId, sellerId, adId, amount } = req.body;

    // Create a new transaction object
    const transaction = new TransactionModel({
      buyerId,
      sellerId,
      adId,
      amount,
      status: 'Pending',
    });

    // Save the transaction
    const savedTransaction = await transaction.save();

    // Add the transaction reference to the buyer's wallet
    const buyerWallet = await WalletModel.findOneAndUpdate(
      { userId: buyerId },
      { $push: { transactions: savedTransaction._id } },
      { new: true }
    );

    // Add the transaction reference to the seller's wallet
    const sellerWallet = await WalletModel.findOneAndUpdate(
      { userId: sellerId },
      { $push: { transactions: savedTransaction._id } },
      { new: true }
    );

    res.status(200).json({ message: 'Transaction created successfully' });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'An error occurred while creating the transaction' });
  }
});


// get transactions of a user
export const getTransactions = asyncHandler(async (req, res) => {
  try {
    const currentUser = req.user;
    const { _id } = currentUser;

    const transactions = await TransactionModel.find({
      $or: [{ buyerId: _id }, { sellerId: _id }],
    })
      .populate('buyerId', '-password') // Replace 'buyerId' with the actual path in your Transaction schema
      .populate('sellerId', '-password') // Replace 'sellerId' with the actual path in your Transaction schema
      .populate('adId'); // Replace 'adId' with the actual path in your Transaction schema
    res.status(200).json({ transactions });
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({ error: 'An error occurred while getting the transactions' });
  }
});

// get total balance of a user wallet
export const getBalance = asyncHandler(async (req, res) => {
  try {
    const currentUser = req.user;
    const { _id } = currentUser;

    const wallet = await WalletModel.findOne({ userId: _id });
    res.status(200).json({
      depositedAmount: wallet.depositedAmount,
      withdrawnAmount: wallet.withdrawnAmount,
      balance: wallet.balance,
    });
  } catch (error) {
    console.error('Error getting balance:', error);
    res.status(500).json({ error: 'An error occurred while getting the balance' });
  }
});

// deposite money to a user wallet
export const depositMoney = asyncHandler(async (req, res) => {
  try {
    const currentUser = req.user;
    const { _id } = currentUser;
    const { amount } = req.body;
    // Find the wallet for the specified user and update its balance and deposited amount
    const wallet = await WalletModel.findOneAndUpdate(
      { userId: _id },
      {
        $inc: { balance: amount, depositedAmount: amount },
      },
      { new: true }
    );

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }


    res.status(200).json({
      message: 'Amount deposited successfully',
      depositedAmount: wallet.depositedAmount,
      withdrawnAmount: wallet.withdrawnAmount,
      balance: wallet.balance,
    });
  } catch (error) {
    console.error('Error depositing amount:', error);
    res.status(500).json({ error: 'An error occurred while depositing the amount' });
  }
});

// withdraw money from a user wallet
export const withdrawMoney = asyncHandler(async (req, res) => {
  try {
    const currentUser = req.user;
    const { _id } = currentUser;
    const { amount } = req.body;
    // Find the wallet for the specified user
    const wallet_ = await WalletModel.findOne({ userId: _id });
    if (!wallet_) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    // Check if the withdrawal amount is greater than the available balance
    if (amount > wallet_.balance) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Find the wallet for the specified user and update its values
    const wallet = await WalletModel.findOneAndUpdate(
      { userId: _id },
      { $inc: { balance: -amount, withdrawnAmount: amount } },
      { new: true }
    );

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }


    res.status(200).json({
      message: 'Amount withdrawn successfully',
      depositedAmount: wallet.depositedAmount,
      withdrawnAmount: wallet.withdrawnAmount,
      balance: wallet.balance,
    });
  } catch (error) {
    console.error('Error withdrawing amount:', error);
    res.status(500).json({ error: 'An error occurred while withdrawing the amount' });
  }
});


// get Pending Transactions of for all users
export const getPendingTransactions = asyncHandler(async (req, res) => {
  try {
    const pendingTransactions = await TransactionModel.find({ status: 'Pending' })
      .populate('buyerId') // Replace 'buyerId' with the actual path in your Transaction schema
      .populate('sellerId') // Replace 'sellerId' with the actual path in your Transaction schema
      .populate('adId'); // Replace 'adId' with the actual path in your Transaction schema
    res.status(200).json({ transactions: pendingTransactions });
  } catch (error) {
    console.error('Error getting pending transactions:', error);
    res.status(500).json({ error: 'An error occurred while getting the pending transactions' });
  }
});


// approve transaction by admin
export const approveTransaction = asyncHandler(async (req, res) => {
  try {
    const { id, adID } = req.body;
    const transaction = await TransactionModel.findByIdAndUpdate(
      id,
      { $set: { status: 'Completed' } },
      { new: true }
    );

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    // Delete the associated ad
    await AdModel.findByIdAndDelete(adID);
    // Add the ad amount to the seller's wallet balance
    const sellerWallet = await WalletModel.findOneAndUpdate(
      { userId: transaction.sellerId },
      { $inc: { balance: transaction.amount } },
      { new: true }
    );

    res.status(200).json({ message: 'Transaction approved successfully' });
  } catch (error) {
    console.error('Error approving transaction:', error);
    res.status(500).json({ error: 'An error occurred while approving the transaction' });
  }
});

// reject transaction by admin
export const rejectTransaction = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const transaction = await TransactionModel.findByIdAndUpdate(
      id,
      { $set: { status: 'Cancelled' } },
      { new: true }
    );

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    // Add the ad amount back to the buyer's wallet balance
    const buyerWallet = await WalletModel.findOneAndUpdate(
      { userId: transaction.buyerId },
      { $inc: { balance: transaction.amount } },
      { new: true }
    );

    res.status(200).json({ message: 'Transaction rejected successfully' });
  } catch (error) {
    console.error('Error rejecting transaction:', error);
    res.status(500).json({ error: 'An error occurred while rejecting the transaction' });
  }
});

// maketransaction from wallet
export const makeTransactionFromWallet = asyncHandler(async (req, res) => {
  try {
    const { buyerId, sellerId, adId, amount } = req.body;

    // Find the ad
    const ad = await AdModel.findById(adId);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    // Find the wallet for the specified user
    const wallet_ = await WalletModel.findOne({ userId: buyerId });
    if (!wallet_) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    // Check if the withdrawal amount is greater than the available balance
    if (amount > wallet_.balance) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Create a new transaction
    const transaction = await TransactionModel.create({
      buyerId: buyerId,
      sellerId: sellerId,
      adId,
      amount,
      status: 'Pending',
    });

    // Find the wallet for the specified user and update its values
    const wallet = await WalletModel.findOneAndUpdate(
      { userId: buyerId },
      { $inc: { balance: -amount, withdrawnAmount: amount } },
      { new: true }
    );

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.status(200).json({
      message: 'Transaction made successfully',
    });
  } catch (error) {
    console.error('Error making transaction:', error);
    res.status(500).json({ error: 'An error occurred while making the transaction' });
  }
});