const express = require('express');
const { createUser, loginUser, getAllUser, getaUser, deleteUser, updatedUser } = require('../controller/userController');
const router = express.Router()

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/allUsers', getAllUser)
router.get('/:id', getaUser);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', updatedUser)

module.exports = router;

// Example routes = http://localhost:8080/api/user/register change last part of the url