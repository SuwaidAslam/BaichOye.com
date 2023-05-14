import mongoose from "mongoose";
import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const AuthSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      maxLength: 64,
      required: true,
    },
    phone: {
      type: Number,
    },
    picture: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    ads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ads',
      },
    ],
  },
  { timestamps: true }
)


// Define middleware function to delete child documents when a parent is deleted
AuthSchema.pre('remove', async function (next) {
  try {
    const Ads = mongoose.model('Ads');
    const ads = await Ads.find({ user: this._id });

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
    await Ads.deleteMany({user: this._id}).exec();
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model('User', AuthSchema)
