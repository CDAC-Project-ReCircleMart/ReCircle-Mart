// routes/listingRoutes.js

const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const auth = require("../middleware/authMiddleware");
const upload = require("../utils/upload"); // multer for images

// 🔴 CREATE LISTING (SELL FORM) – PROTECTED
router.post(
  "/",
  auth,
  upload.array("images", 12), // accept multiple images
  listingController.createListing,
);

// 🔴 GET ALL LISTINGS (HOME PAGE)
router.get("/", listingController.getAllListings);

// 🔴 GET SINGLE LISTING (PRODUCT DETAIL)
router.get("/:id", listingController.getSingleListing);

// 🔴 GET MY LISTINGS (PROFILE PAGE) – PROTECTED
router.get("/user/me", auth, listingController.getMyListings);

module.exports = router;
