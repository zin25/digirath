const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }
})
// end function new Product

// Update product
const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const updateProduct = await Product.findOneAndUpdate({id}, req.body, {
            new: true,
        })
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error)
    }
})
// End Function Add Product

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  try {
    const deleteProduct = await Product.findOneAndDelete(id)
    res.json(deleteProduct)
  } catch (error) {
    throw new Error(error);
  }
});
// End Function Delete Product

// Get A Product
const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const findProduct = await Product.findById(id)
        res.json(findProduct)
    } catch (error) {
        throw new Error(error)
    }
})
// End get a Product

// Get all products
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        const getallProduct = await Product.find()
        res.json(getallProduct)
    } catch (error) {
        throw new Error(error)
    }
})

// end function get all products

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};