import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String
  },
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

// Define middleware function to delete child documents when a parent is deleted
CategorySchema.pre('remove', async function (next) {
  try {
    const User = mongoose.model('Ads');
    // Remove ad reference from all child User documents
    await User.updateMany({ category: this._id }, { $pull: { category: this._id } }).exec();
    next();
  } catch (err) {
    next(err);
  }
});

export default Category;
