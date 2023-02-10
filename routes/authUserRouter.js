const express = require('express');
const { createUser, loginUser, getAllUser } = require('../controller/userController');
const router = express.Router()

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/allUsers', getAllUser)

module.exports = router;