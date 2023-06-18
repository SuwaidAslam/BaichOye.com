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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  const Transaction = mongoose.model('Transaction', transactionSchema);

  export default Transaction;
  
  