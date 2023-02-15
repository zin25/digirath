const express = require('express')
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const {isAdmin, authMiddleware} = require("../middleware/authMiddleware")
const router = express.Router()

router.post('/', createProduct)
router.get("/", getAllProduct);
router.get("/:id", isAdmin, authMiddleware, getaProduct);
router.delete("/:id", isAdmin, authMiddleware, deleteProduct);
router.put("/:id", isAdmin, authMiddleware, updateProduct);

module.exports = router