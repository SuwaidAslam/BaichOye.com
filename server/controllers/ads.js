import Ad from '../mongodb/models/ad.js';

export const getAds = async (req, res) => {
    try {
        const ads = await Ad.find({});
        res.status(200).json({success: true, data: ads});
    } catch (error) {
        res.status(500).json({success: false, data: error});
    }
}

export const createAd = async (req, res) => {
    try {
        const ad = req.body;
        // const newAd = await PostSchema.create(ad);
        const newAd = new Ad(ad);
        await newAd.save();
        res.status(201).json({success: true, data: newAd});
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
}