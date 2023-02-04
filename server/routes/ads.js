import express from "express";
import {getAds, createAd} from '../controllers/ads.js';

const router = express.Router();

router.get('/', getAds); 
router.post('/', createAd);

export default router;
