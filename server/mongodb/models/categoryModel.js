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

export default Category;
