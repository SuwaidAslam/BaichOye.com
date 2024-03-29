import AdModel from '../mongodb/models/adModel.js';
import asyncHandler from 'express-async-handler';
import AuthModel from '../mongodb/models/authModel.js';
import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __dirname = dirname(fileURLToPath(import.meta.url));

// POST ADS
export const postAd = asyncHandler(async (req, res) => {
    const user = req.user

    if (!req.files || req.files.length < 1) {
        throw new Error('Please include at least one image')
    }

    const filenames = req.files.map((file) => file.filename)

    const { title, description, brand, condition, location, price, category } =
        req.body
    if (
        !title ||
        !description ||
        !brand ||
        !condition ||
        !req.files ||
        !location ||
        !price ||
        !category
    ) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    const data = {
        title,
        description,
        brand,
        condition,
        images: filenames,
        location,
        price,
        category,
        user: user._id,
    }

    const doc = new AdModel(data)

    await doc.save()
    if (doc) {
        res.json({ successMsg: 'Your ad has been published' })

        // add item to user array
        const updateUserItem = await AuthModel.findOneAndUpdate(
            { _id: doc.user._id },
            {
                $push: { ads: doc._id },
            }
        )
    } else {
        throw new Error('could not save your ad')
    }
})

// GET ADS
export const getAds = asyncHandler(async (req, res) => {
    const ads = await AdModel.find({}).populate('category', 'name')
    if (!ads) {
        res.status(404)
        throw new Error('No ads data to show')
    }

    res.json(ads)
})

// GET INDIVIDUAL AD
export const getAd = asyncHandler(async (req, res) => {
    const id = req.params.id
    const ad = await AdModel.findOne({ _id: id }).populate({
        path: 'user',
        select: '-password',
    })

    if (!ad) {
        res.status(404)
        throw new Error('No item found')
    }

    res.json(ad)
})

// GET Item User
export const itemUser = asyncHandler(async (req, res) => {
    const { userId } = req.body

    const user = await AuthModel.findOne({ _id: userId })
        .select('-password')
        .select('-ads')

    if (!user) {
        res.status(404)
        throw new Error('No user found')
    }

    res.json(user)
})

// DELETE INDIVIDUAL AD
export const deleteAd = asyncHandler(async (req, res) => {
    const authUser = req.user

    const id = req.params.id

    // // check if user is authorized to delete this ad
    // const ad = await AdModel.findOne({ _id: id }).select('user')

    // if (ad.user._id.toString() !== authUser.id) {
    //     res.status(401)
    //     throw new Error('Not authorized! cant delete this ad')
    // }

    // delete
    const deletedAd = await AdModel.findById(id)

    if (!deletedAd) {
        res.status(404)
        throw new Error('No item found! Cannot delete this item')
    }

        // get the array of file paths from the database or request body
    const imageFiles = deletedAd.images;
    // loop through the array and delete each file using fs.unlink()
    for (const imageName of imageFiles) {
        const filePath = path.join(__dirname, '../public/uploads/', imageName);
        fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to delete the image file' });
        }
        });
    }
    
    await deletedAd.remove();
    res.json({ successMsg: 'Ad and Image deleted', id: deletedAd._id })
})

// UPDATE INDIVIDUAL AD
export const updateAd = asyncHandler(async (req, res) => {
    const authUser = req.user

    const id = req.params.id

    const filenames = req.files.map((file) => file.filename)

    const {
        title,
        description,
        brand,
        condition,
        location,
        price,
        category,
    } = req.body


    // check if user is authorized to delete this ad
    const ad = await AdModel.findOne({ _id: id }).select('user')
    if (ad.user._id.toString() !== authUser.id) {
        res.status(401)
        throw new Error('Not authorized! cant update this ad')
    }

    // update
    const updatedAd = await AdModel.findByIdAndUpdate(
        id,
        {
            title,
            description,
            brand,
            condition,
            images: filenames,
            location,
            price,
            category,
        },
        { new: true }
    )

    if (!updatedAd) {
        throw new Error('Something went wrong')
    }

    res.json({ successMsg: 'Ad updated successfully', ad: updatedAd })
})

// my ads
export const myads = asyncHandler(async (req, res) => {
    const user = req.user
    // const ads = await AdModel.find({ user: user.id }).select(
    //     'title price images createdAt'
    // )
    const ads = await AdModel.find({ user: user.id })

    if (!ads) {
        throw new Error('Something went wrong')
    }

    res.json(ads)
})

// get ad by id
export const getAdById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const ad = await AdModel.findOne({ _id: id })
        .populate('user', '-password')
        .populate('category', 'name')

    if (!ad) {
        throw new Error('Something went wrong')
    }

    res.json(ad)
})

// get all the ads in the db
export const getAllAds = asyncHandler(async (req, res) => {
    const ads = await AdModel.find({}).populate('user', '-password')

    if (!ads) {
        throw new Error('Something went wrong')
    }

    res.json(ads)
})