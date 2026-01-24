
// controllers/chatController.js

const db = require("../config/db");

// 🔴 START CHAT
exports.startChat = async (req, res) => {
  try {
    const { listingId, sellerId } = req.body;
    const buyerId = req.user.id;

    // Check if chat already exists
    const [existing] = await db.query(
      "SELECT id FROM chats WHERE listing_id = ? AND buyer_id = ?",
      [listingId, buyerId]
    );

    if (existing.length > 0) {
      return res.json({ chatId: existing[0].id });
    }

    // Create new chat
    const [result] = await db.query(
      "INSERT INTO chats (listing_id, buyer_id, seller_id) VALUES (?, ?, ?)",
      [listingId, buyerId, sellerId]
    );

    res.json({ chatId: result.insertId });
  } catch (err) {
    console.error("❌ Start chat error:", err);
    res.status(500).json({ message: "Failed to start chat" });
  }
};

// 🔴 GET USER CHATS (MESSAGES PAGE LEFT SIDEBAR)
exports.getMyChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT c.id, u.first_name AS name, u.avatar
       FROM chats c
       JOIN users u ON (u.id = IF(c.buyer_id = ?, c.seller_id, c.buyer_id))
       WHERE c.buyer_id = ? OR c.seller_id = ?`,
      [userId, userId, userId]
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Get chats error:", err);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

// 🔴 GET CHAT MESSAGES
exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at",
      [chatId]
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Get messages error:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// 🔴 SEND MESSAGE
exports.sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const senderId = req.user.id;

    await db.query(
      "INSERT INTO messages (chat_id, sender_id, message) VALUES (?, ?, ?)",
      [chatId, senderId, text]
    );

    res.json({ message: "Message sent" });
  } catch (err) {
    console.error("❌ Send message error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
};
