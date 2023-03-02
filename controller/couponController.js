const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

// Create a new Coupon
const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
// End Create a new Coupon

// Get All Coupons
const getallCoupon = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});
// End Get All Coupons

// Update a Coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updateCoupon)
  } catch (error) {
    throw new Error(error);
  }
});
// End Update a Coupon

// Delete a Coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    res.json(deleteCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
// End Delete a Coupon

module.exports = { createCoupon, getallCoupon, updateCoupon, deleteCoupon };
