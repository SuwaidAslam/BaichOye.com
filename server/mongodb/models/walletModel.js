import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    adId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ads',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'],
      default: 'Pending',
      required: true,
    },
    type: {
      type: String,
      enum: ['Credit', 'Debit', 'Refund'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const walletSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
      required: true,
    },
    transactions: [transactionSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
