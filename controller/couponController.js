const Coupon = require('../models/couponModel')
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

// Create a new Coupon
const createCoupon = asyncHandler(async(req, res)=> {

})
// End Create a new Coupon

module.exports = { createCoupon };
