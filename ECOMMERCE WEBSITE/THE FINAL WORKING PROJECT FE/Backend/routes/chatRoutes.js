// routes/chatRoutes.js

const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const auth = require("../middleware/authMiddleware");

// 🔴 START CHAT (FROM PRODUCT PAGE)
router.post("/start", auth, chatController.startChat);

// 🔴 GET MY CHATS (LEFT SIDEBAR)
router.get("/", auth, chatController.getMyChats);

// 🔴 GET MESSAGES OF A CHAT
router.get("/:chatId/messages", auth, chatController.getMessages);

// 🔴 SEND MESSAGE
router.post("/send", auth, chatController.sendMessage);

module.exports = router;
