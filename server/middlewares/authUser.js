import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import AuthModel from '../mongodb/models/authModel.js'

const authUser = expressAsyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      // verify token
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY)

      req.user = await AuthModel.findOne({ email: decoded.email }).select(
        '-password'
      )
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }

  next()
})

export default authUser