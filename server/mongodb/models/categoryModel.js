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

// Define middleware function to delete child documents when a parent is deleted
CategorySchema.pre('remove', async function (next) {
  try {
    const Ads = mongoose.model('Ads');
    // Remove ad reference from all child User documents
    await Ads.deleteMany({category: this._id}).exec();
    next();
  } catch (err) {
    next(err);
  }
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
