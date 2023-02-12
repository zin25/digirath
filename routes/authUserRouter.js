const express = require('express');
const { createUser, loginUser, getAllUser, getaUser, deleteUser, updatedUser, blockUser, unblockUser } = require('../controller/userController');
const router = express.Router()
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware')

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/allUsers', getAllUser)
router.get('/:id', authMiddleware, isAdmin, getaUser);
router.delete('/delete/:id', deleteUser);
router.put('/update', authMiddleware, updatedUser)
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;

// Example routes = http://localhost:8080/api/user/register change last part of the url