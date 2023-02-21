const Category = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});
// End create category

// Update a category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});
// End Update a category

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCategory = await Category.findByIdAndRemove(id);
    res.json(deleteCategory);
  } catch (error) {
    throw new Error(error);
  }
});
// End Delete Category

// Get A Category
const getaCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await Category.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});
// End Get a Category

// Get All Categories
const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategory = await Category.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error(error);
  }
});
// End Get All Categories

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getaCategory,
  getAllCategory,
};
