import Category from '../mongodb/models/categoryModel.js';
import Ads from '../mongodb/models/adModel.js';
import asyncHandler from 'express-async-handler';

// Add a new category
export const addCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Check if category with the same name already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        res.status(400);
        throw new Error(`Category with name '${name}' already exists`);
    }

    // Handle image upload
    const file = req.files[0];
    let imageName;
    if (file) {
        imageName = file.filename;
    }

    // Create a new category
    const category = new Category({ name, image: imageName });

    // Save the category to the database
    const createdCategory = await category.save();

    res.status(201).json({ category: createdCategory });
});

// Get all categories
export const getCategories = asyncHandler(async (req, res, next) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({ success: true, message: 'Categories fetched', categories });
    } catch (error) {
        next(error);
    }
});

// Delete a category by ID
export const deleteCategoryById = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, message: 'Category deleted', category });
    } catch (error) {
        next(error);
    }
});


// get Category by ID
export const getCategoryById = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, message: 'Category fetched', category });
    } catch (error) {
        next(error);
    }
});


// Create a Router method to update Category Image by Id and also delete the old image
export const updateCategoryImage = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        const file = req.files[0];
        let imageName;
        if (file) {
            imageName = file.filename;
        }
        category.image = imageName;
        await category.save();
        res.status(200).json({ success: true, message: 'Category image updated', category });
    } catch (error) {
        next(error);
    }
});

// Update a category by ID
export const updateCategoryById = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        const { name } = req.body;
        category.name = name;
        await category.save();
        res.status(200).json({ success: true, message: 'Category updated', category });
    } catch (error) {
        next(error);
    }
});


// Create a router function to get Ads by Category Id from Ads model
export const getAdsByCategory = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        const ads = await Ads.find({ category: id }).populate('category', 'name');
        res.status(200).json({ success: true, message: 'Ads fetched', ads });
    } catch (error) {
        next(error);
    }
});