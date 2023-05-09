import express from "express";
import { multerMiddleware, upload } from '../config/multer.js';
import {
    addCategory,
    getCategories,
    deleteCategoryById,
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/add', upload, multerMiddleware, addCategory)
router.get('/getAll', getCategories)
router.post('/delete', deleteCategoryById)

export default router;
