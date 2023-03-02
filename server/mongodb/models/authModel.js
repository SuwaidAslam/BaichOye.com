import mongoose from "mongoose";

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

export default mongoose.model('User', AuthSchema)
