// routes/adminRoutes.js

const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

/* ===================== USERS MANAGEMENT ===================== */

// 🔹 GET ALL USERS
router.get("/users", auth, admin, adminController.getAllUsers);

// 🔹 DELETE USER
router.delete("/users/:userId", auth, admin, adminController.deleteUser);

// 🔹 MAKE USER ADMIN
router.put("/users/:userId/make-admin", auth, admin, adminController.makeAdmin);

// 🔹 REMOVE ADMIN ROLE
router.put(
  "/users/:userId/remove-admin",
  auth,
  admin,
  adminController.removeAdmin,
);

/* ===================== LISTINGS MANAGEMENT ===================== */

// 🔹 GET ALL LISTINGS
router.get("/listings", auth, admin, adminController.getAllListings);

// 🔹 DELETE LISTING
router.delete(
  "/listings/:listingId",
  auth,
  admin,
  adminController.deleteListing,
);

/* ===================== DASHBOARD ===================== */

// 🔹 GET DASHBOARD STATS
router.get("/dashboard", auth, admin, adminController.getDashboardStats);

module.exports = router;
