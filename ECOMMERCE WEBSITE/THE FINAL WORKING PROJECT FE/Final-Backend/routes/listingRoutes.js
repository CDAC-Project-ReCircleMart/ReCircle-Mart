const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const auth = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

// 🔴 CREATE LISTING
router.post(
  "/",
  auth,
  upload.array("images", 12),
  listingController.createListing,
);

// 🔴 GET ALL LISTINGS
router.get("/", listingController.getAllListings);

// 🔴 GET MY LISTINGS (PROFILE)
router.get("/user/me", auth, listingController.getMyListings);

// 🔴 UPDATE LISTING (EDIT)  ⭐ MUST COME BEFORE :id GET
router.put("/:id", auth, listingController.updateListing);

// 🔴 DELETE LISTING
router.delete("/:id", auth, listingController.deleteListing);

// 🔴 GET SINGLE LISTING (LAST ALWAYS)
router.get("/:id", listingController.getSingleListing);

module.exports = router;
