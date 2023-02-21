const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getaBrand,
  getAllBrand,
} = require("../controller/brandController");

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/:id", getaBrand);
router.get("/", getAllBrand);

module.exports = router;
