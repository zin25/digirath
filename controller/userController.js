const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const generateToken = require("../config/jwtToken");
const validateMongoDbId = require('../utils/validateMongoDbId');
const {generateRefreshToken} = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('./emailController');

// Buat User Baru
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error ("User Sudah Ada")
  }
});
// End function buat user baru

// User Login
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const findUser = await User.findOne({email});
  if (findUser && await findUser.isPasswordMatched(password)) {
    const refreshToken = await generateRefreshToken(findUser?._id)
    const updateuser = await User.findByIdAndUpdate(findUser.id, {
      refreshToken: refreshToken
    },{ new: true})
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000
    })
    res.json({
      _id: findUser?._id,
      namadepan: findUser?.namadepan,
      namabelakang: findUser?.namabelakang,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error('Username atau Password salah')
  }
})
// End function login

// Handle refresh Token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies
  if(!cookie?.refreshToken) throw new Error('No refresh token in cookies')
  const refreshToken = cookie.refreshToken
  const user = await User.findOne({ refreshToken })
  if(!user) throw new Error('No refresh token present in database or not match')
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const acccessToken = generateToken(user?._id);
    res.json({ acccessToken });
  });
})
// End handle refresh Token

// Logout Function
const logout = asyncHandler (async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if(!user) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204);
    }
    await User.findOneAndUpdate(refreshToken, {
      refreshToken: "",
    })
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
    })
    res.sendStatus(204);
})
// End Logout Function

// Get All Users
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUser = await User.find();
    res.json(getUser);
  } catch (error) {
    throw new Error(error)
  }
})
// End function Get All Users

// Get single User
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
// End get single user

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id)
  try {
    const deleteUser = await User.findByIdAndDelete(id)
    res.json({deleteUser,})
  } catch (error) {
    throw new Error(error)
  }
});
// End Delete User

// Update User
const updatedUser = asyncHandler(async (req, res) => {
  const {_id} = req.user
  validateMongoDbId(_id)
  try {
    const updatedUser = await User.findByIdAndUpdate(_id,{
      namadepan: req?.body?.namadepan,
      namabelakang: req?.body?.namabelakang,
      email: req?.body?.email,
      mobile: req?.body?.mobile,
    },{
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
})
// End Update User

// Block or Ublock Function
const blockUser = asyncHandler (async (req, res) => {
  const {id} = req.params
  validateMongoDbId(id)
  try {
    const block = await User.findByIdAndUpdate(id, {
      isBlocked: true,
    }, {
      new: true,
    })
    res.json(block);
  } catch (error) {
    throw new Error(error)
  }
})

const unblockUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
      const unblock = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: false,
        },
        {
          new: true,
        }
      );
      res.json(unblock)
    } catch (error) {
      throw new Error(error);
    }
  });
// End Block or Ublock Function

// Reset Password
const updatePassword = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  const {password} = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id)
  if (password) {
    user.password = password;
    const updatedPassword = await user.save()
    res.json(updatedPassword);
  } else {
    res.json(user)
  }
});
// End reset password

// Forgot password Token
const forgotPasswordToken = asyncHandler (async (req, res)=> {
  const {email} = req.body;
  const user = await User.findOne({ email })
  if (!user) throw new Error ('User not found');
  try {
    const token = await user.createPasswordResetToken()
    await user.save();
    const resetURL = `Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. <a href='http://localhost:8000/api/user/reset-password/${token}'>Click Here</>`
    const data = {
      to: email,
      text: "HEY user",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data)
    res.json(token)
  } catch (error) {
    throw new Error(error)
  }
})
// End Forgot Password Token

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const {password} = req.body
  const {token} = req.params
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })
  if (!user) throw new Error ("Token expired, Please try again later");
  user.password = password
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
})
// End Reset Password

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getaUser,
  deleteUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
};