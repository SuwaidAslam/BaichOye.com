import mongoose, { mongo } from "mongoose";

const adSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    pictures: [String],
    price: String,
    location: String,
    creator: String,
    createdAt: { type: Date, default: Date.now },
    meta: {
        age: String,
        usage:  String,
        condition: String
      }
});


const Ad = mongoose.model('Advertisement', adSchema);

export default Ad;