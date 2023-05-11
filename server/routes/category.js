import express from "express";
import { multerMiddleware, upload } from '../config/multer.js';
import {
    addCategory,
    getCategories,
    deleteCategoryById,
    getCategoryById,
    updateCategoryById,
    updateCategoryImage,
    getAdsByCategory
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/add', upload, multerMiddleware, addCategory)
router.get('/getAll', getCategories)
router.post('/delete/:id', deleteCategoryById)
router.get('/getCategory/:id', getCategoryById)
router.patch('/updateCategory/:id', updateCategoryById)
router.patch('/image/:id', upload, multerMiddleware, updateCategoryImage)
router.get('/getAdsByCategory/:id', getAdsByCategory)

export default router;
