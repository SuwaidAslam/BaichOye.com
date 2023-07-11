import asynHandler from 'express-async-handler'
// import AuthModel from '../models/authModel'
import jwt from 'jsonwebtoken'
import Joi from "joi";
import authModel from '../mongodb/models/authModel.js'
import bcrypt from "bcrypt";
import passwordComplexity from "joi-password-complexity";
import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import WalletModel from '../mongodb/models/walletModel.js'
// const { OAuth2Client } = require('google-auth-library')


const __dirname = dirname(fileURLToPath(import.meta.url));

export const validate = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required().label("Full Name"),
    email: Joi.string().email().required().label("Email"),
    phone: Joi.string().pattern(new RegExp('^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$')).messages({ 'string.pattern.base': `Phone number is not Valid` }).required().label("Phone"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

// const client = new OAuth2Client({
//   clientId:
//     '755428588274-5nl45or7hrlck14neughadquor3bjaph.apps.googleusercontent.com',
// })

// // nodemailer
// const nodemailer = require('nodemailer')
// let transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: 'zubairkamboh9010@gmail.com', // generated ethereal user
//     pass: 'bsssefjgpbwpaqld', // generated ethereal password
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// })

// SIGNUP
const signup = asynHandler(async (req, res) => {
  // const { error } = validate(req.body);
  // if (error)
  //   return res.status(400).send({ message: error.details[0].message });

  const { fullName, phone, email, password, password2 } = req.body;

  if (!fullName || !phone || !email || !password || !password2) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const data = {
    fullName,
    phone,
    email,
    password,
  };
  const { error } = validate(data);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  // Check both passwords
  if (password !== password2) {
    res.status(400).send({ message: 'Passwords do not match' });
    throw new Error('Passwords do not match');
  }

  const emailExist = await authModel.findOne({ email });

  // Check if email already exists
  if (emailExist) {
    res.status(400).send({ message: 'Email already exists' });
    throw new Error('Email already exists');
  }

  // Save user
  const user = new authModel(data);

  await user.save();

  if (!user) {
    throw new Error('Something went wrong');
  }

  // Create a wallet for the user
  const wallet = new WalletModel({
    userId: user._id,
    balance: 0, // Set initial balance to 0 or any other default value
    transactions: [], // Initialize with an empty transactions array
  });

  await wallet.save();

  // Generate a new token
  const newToken = jwt.sign({ id: user._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: '1d',
  });

  res.status(201).json({ successMsg: 'Registered Successfully!', token: newToken });

})

// SIGNIN
const signin = asynHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).send({ message: 'Please include all fields' });
    throw new Error('Please include all fields')
  }

  // // check passwords length
  // if (password.length < 8 || password2.length < 8) {
  //   res.status(400)
  //   throw new Error('Minimum length should be 8 characters')
  // }

  // generate token
  const token = jwt.sign({ email }, process.env.JWTPRIVATEKEY, {
    expiresIn: '1d',
  })

  const user = await authModel.findOne({ email })

  // check if email do not exists
  if (!user) {
    res.status(400).send({ message: "Email does'nt exist! Please sign up first" });
    throw new Error("Email does'nt exist! Please sign up first")
  }

  // if passwords do not match
  if (user.password !== password) {
    res.status(400)
    throw new Error('Incorrect password!')
  }

  // sign in user
  res.json({
    successMsg: 'Sign in successfully!',
    token,
    user: {
      _id: user._id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      ads: user.ads,
      verificationStatus: user.verificationStatus,
    },
  })
})



// route      /api/auth/update/:id
// access     private
// method     put
const updateProfile = asynHandler(async (req, res) => {
  const { fullName, email, phone } = req.body
  const id = req.params.id

  if (
    !fullName ||
    !email ||
    !phone
  ) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // get token
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null

  // no token
  if (!token) {
    res.status(401)
    throw new Error('Not authorized! no token')
  }

  // token exists
  const tokenVerified = jwt.verify(token, process.env.JWTPRIVATEKEY)

  // tempered token
  if (!tokenVerified) {
    res.status(403)
    throw new Error('Invalid or expired token')
  }

  const updatedUser = await authModel.findByIdAndUpdate(
    id,
    {
      fullName,
      email,
      phone
    },
    { new: true }
  )

  if (!updatedUser) {
    throw new Error('Something went wrong')
  }

  res.json({ successMsg: 'Your details updated successfully', user: updatedUser })
})

// getAllUsers route
// route      /api/auth/getAllUsers
// access     private
// method     get
const getAllUsers = asynHandler(async (req, res) => {
  const users = await authModel.find({}).select('-password').populate('ads')
  res.json(users)
})

// getUserById route
// route      /api/auth/getUser/:id
// access     private
// method     get
const getUserById = asynHandler(async (req, res) => {
  const user = await authModel.findById(req.params.id)
    .select('-password')
    .populate({
      path: 'ads',
      populate: { path: 'category' }
    })
  res.json(user)
});

// delete User by Id
// route      /api/auth/deleteUser/:id
// access     private
// method     delete
const deleteUserById = asynHandler(async (req, res) => {
  const user = await authModel.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  await user.remove()
  res.json({ successMsg: 'User removed' })
});

// verify user by id
// route      /api/auth/verify/:id
// access     private
// method     put
const submitVerificationData = asynHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const { issuingCountry, idType } = req.body;


    // Find the user by ID
    const user = await authModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle image upload
    const file = req.files[0];
    let imageName;
    if (file) {
      imageName = file.filename;
    }

    // Check if required fields are not empty
    if (!imageName || !issuingCountry || !idType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Update the verification details
    user.IDCardImage = imageName;
    user.issuingCountry = issuingCountry;
    user.IDType = idType;
    user.verificationStatus = 'Pending';

    // Save the updated user
    await user.save();

    res.json({ message: 'Verification data saved successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// checkVerificationDataSubmission route
// route      /api/auth/checkVerificationDataSubmission/:id
// access     private
// method     get
const checkVerificationStatus = asynHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await authModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // const {  } = user;

    res.json({ user});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// getVerificationRequests route
// route      /api/auth/getVerificationRequests
// access     private
// method     get
const getVerificationRequests = asynHandler(async (req, res) => {
  try {
    const users = await authModel.find({ verificationStatus: "Pending", IDCardImage: { $ne: null } }).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// rejectVerificationRequest route
// route      /api/auth/rejectVerificationRequest/:id
// access     private
// method     put
const rejectVerificationRequest = asynHandler(async (req, res) => {
  try {
    const userId = req.body.id;

    // Find the user by ID
    const user = await authModel.findById(userId);

    const IDCardImage = user.IDCardImage;

    const filePath = path.join(__dirname, '../public/uploads/', IDCardImage);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete the image file' });
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the verification details
    user.IDCardImage = null;
    user.issuingCountry = null;
    user.IDType = null;
    user.verificationStatus = 'Rejected';

    // Save the updated user
    await user.save();

    res.json({ message: 'Verification request rejected successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// approveVerificationRequest route
// route      /api/auth/approveVerificationRequest/:id
// access     private
// method     put
const approveVerificationRequest = asynHandler(async (req, res) => {
  try {
    const userId = req.body.id;

    // Find the user by ID
    const user = await authModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the verification details
    user.verificationStatus = 'Approved';

    // Save the updated user
    await user.save();

    res.json({ message: 'Verification request approved successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



export {
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
}