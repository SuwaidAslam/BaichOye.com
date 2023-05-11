import mongoose from "mongoose";

const AdSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

// Define middleware function to delete child documents when a parent is deleted
AdSchema.pre('remove', async function (next) {
  try {
    const User = mongoose.model('User');
    // Remove ad reference from all child User documents
    await User.updateMany({ ads: this._id }, { $pull: { ads: this._id } }).exec();
    next();
  } catch (err) {
    next(err);
  }
});

const Ads = mongoose.model('Ads', AdSchema);

export default Ads;