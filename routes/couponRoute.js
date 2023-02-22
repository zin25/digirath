const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/')

module.exports = router