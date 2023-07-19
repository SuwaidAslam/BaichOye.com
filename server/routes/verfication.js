import express from "express";
import {
    getCNICData
} from '../controllers/verficationController.js';

const router = express.Router();

router.get('/getCNICData', getCNICData)

export default router;
