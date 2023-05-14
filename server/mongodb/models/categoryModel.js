import mongoose from "mongoose";
import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
    const ads = await Ads.find({ category: this._id });

    // Remove images from storage for all the ads in the category
    ads.forEach((ad) => {
      ad.images.forEach((image) => {
        const imagePath = path.join(__dirname, '../../public/uploads/', image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    });
    // Remove ad reference from all child User documents
    await Ads.deleteMany({category: this._id}).exec();
    next();
  } catch (err) {
    next(err);
  }
});



const Category = mongoose.model('Category', CategorySchema);

export default Category;
