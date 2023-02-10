const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

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
    res.json(findUser);
  } else {
    throw new Error('Username atau Password salah')
  }
})
// End function login

module.exports = {createUser, loginUser};