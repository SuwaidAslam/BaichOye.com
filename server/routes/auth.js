import express from "express";
import { multerMiddleware, upload } from '../config/multer.js';
// import {login} from '../controllers/auth.js';

// router.post("/", login);



import {
  signup,
  signin,
  updateProfile,
  getAllUsers,
  getUserById,
  deleteUserById,
  submitVerificationData,
  checkVerificationStatus,
  getVerificationRequests,
  rejectVerificationRequest,
  approveVerificationRequest,
//   currentUser,
//   activateAccount,
//   forgotPassword,
//   changePassword,
//   googleLogin,
} from '../controllers/authController.js'
// const authUser = require('../middlewares/authUser')

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.put('/update/:id', updateProfile)
router.get('/allUsers', getAllUsers)
router.get('/users/:id', getUserById)
router.delete('/delete/:id', deleteUserById)
router.post('/verify-id/:id', upload, multerMiddleware, submitVerificationData)
router.get('/is-verification-submitted/:id', checkVerificationStatus)
router.get('/getVerificationRequests', getVerificationRequests)
router.post('/rejectVerificationRequest', rejectVerificationRequest)
router.post('/approveVerificationRequest', approveVerificationRequest)

// router.get('/me', authUser, currentUser)
// router.post('/activate', activateAccount)
// router.post('/forget', forgotPassword)
// router.put('/change-password', changePassword)
// router.post('/googlelogin', googleLogin)

export default router;