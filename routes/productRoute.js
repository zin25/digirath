const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
} = require("../controller/productController");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middleware/uploadImages");
const router = express.Router();

router.post("/", createProduct);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.get("/", getAllProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.get("/:id", authMiddleware, isAdmin, getaProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);

module.exports = router;
