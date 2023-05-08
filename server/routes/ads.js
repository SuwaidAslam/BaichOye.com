import express from "express";
import { multerMiddleware, upload } from '../config/multer.js';
import {
  postAd,
  getAds,
  updateAd,
  getAd,
  deleteAd,
  itemUser,
  myads,
  getAdById,
  getAllAds,
} from '../controllers/adController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post('/post', authUser, upload, multerMiddleware, postAd)
router.get('/items', getAds)
router.post('/item/user', itemUser)
router.get('/item/:id', getAd)
router.put('/item/update/:id', authUser, upload, multerMiddleware, updateAd)
// router.delete('/item/delete/:id', authUser, deleteAd)
router.delete('/item/delete/:id', deleteAd)
router.get('/myads', authUser, myads)
router.get('/ads/:id', getAdById)
router.get('/allAds', getAllAds)

export default router;
