const express = require("express");
const {
  createCoupon,
  getallCoupon,
  updateCoupon,
  deleteCoupon
} = require("../controller/couponController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCoupon)
router.get("/", authMiddleware, isAdmin, getallCoupon);
router.put('/:id', authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router