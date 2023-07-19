import verificationData from "../mongodb/models/verificationDataModel.js";
import asyncHandler from 'express-async-handler';


// create a function to get all the recors of cnic data
export const getCNICData = asyncHandler(async (req, res) => {
    try {
        const cnicData = await verificationData.find({});
        res.status(200).json({ cnicData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
})
