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

// Get single User
const getaUser = asyncHandler(async (req, res) => {
  const {id} = req.params;
  try {
    const getaUser = await User.findById(id)
    res.json({getaUser,})
  } catch (error) {
    throw new Error(error)
  }
});
// End get single user

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const {id} = req.params;
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
  const {id} = req.params
  try {
    const updatedUser = await User.findByIdAndUpdate(id,{
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

module.exports = { createUser, loginUser, getAllUser, getaUser, deleteUser, updatedUser };