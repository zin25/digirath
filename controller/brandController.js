const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

// Create a new Brand
const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});
// End create Brand

// Update a Brand
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBrand);
  } catch (error) {
    throw new Error(error);
  }
});
// End Update a Brand

// Delete Brand
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteBrand = await Brand.findByIdAndRemove(id);
    res.json(deleteBrand);
  } catch (error) {
    throw new Error(error);
  }
});
// End Delete Brand

// Get A Brand
const getaBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBrand = await Brand.findById(id);
    res.json(getaBrand);
  } catch (error) {
    throw new Error(error);
  }
});
// End Get a Brand

// Get All Categories
const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const getAllBrand = await Brand.find();
    res.json(getAllBrand);
  } catch (error) {
    throw new Error(error);
  }
});
// End Get All Categories

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getaBrand,
  getAllBrand,
};
