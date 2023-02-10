const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');

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
    res.json({
      _id: findUser?._id,
      namadepan: findUser?.namadepan,
      namabelakang: findUser?.namabelakang,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?.token?._id),
    });
  } else {
    throw new Error('Username atau Password salah')
  }
})
// End function login

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

module.exports = { createUser, loginUser, getAllUser };