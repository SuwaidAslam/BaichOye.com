import mongoose from "mongoose";
const verificationDataSchema = new mongoose.Schema({
    cnicNumber: {
        type: String,
        required: true,
    }
});

const verificationData = mongoose.model('verificationData', verificationDataSchema);

export default verificationData;
