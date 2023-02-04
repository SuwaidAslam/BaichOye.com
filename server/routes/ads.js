import express from "express";
import {getPosts, createAd} from '../controllers/ads.js';

const router = express.Router();

router.get('/', getPosts); 
router.post('/', createAd);

export default router;
