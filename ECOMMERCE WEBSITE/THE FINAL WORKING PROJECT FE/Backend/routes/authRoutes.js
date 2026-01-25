const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../utils/upload"); // 🔴 IMPORTANT

// 🔴 REGISTER WITH AVATAR UPLOAD
router.post("/register", upload.single("avatar"), authController.register);

// 🔴 LOGIN
router.post("/login", authController.login);

module.exports = router;
