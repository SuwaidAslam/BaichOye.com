import express from "express";
import {getUsers, createUser} from '../controllers/users.js';

const router = express.Router();

router.get('/', getAds); 
router.post('/', createAd);

export default router;
