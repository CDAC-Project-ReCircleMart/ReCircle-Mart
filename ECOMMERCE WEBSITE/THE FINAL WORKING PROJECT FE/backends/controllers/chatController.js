const db = require("../config/db");

// 🔴 START CHAT
exports.startChat = async (req, res) => {
  try {
    const { listingId, sellerId } = req.body;
    const buyerId = req.user.id;

    if (!listingId || !sellerId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const [existing] = await db.query(
      `SELECT * FROM chats 
       WHERE listing_id = ? AND buyer_id = ? AND seller_id = ?`,
      [listingId, buyerId, sellerId],
    );

    if (existing.length > 0) {
      return res.json({ chatId: existing[0].id });
    }

    const [result] = await db.query(
      `INSERT INTO chats (listing_id, buyer_id, seller_id)
       VALUES (?, ?, ?)`,
      [listingId, buyerId, sellerId],
    );

    res.json({ chatId: result.insertId });
  } catch (err) {
    console.error("START CHAT ERROR:", err);
    res.status(500).json({ message: "Failed to start chat" });
  }
};

// 🔴 GET MY CHATS (SHOW OTHER USER NAME + AVATAR)
// // 🔴 GET MY CHATS (LEFT SIDEBAR + HEADER USER FIXED)
// exports.getMyChats = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const [rows] = await db.query(
//       `
//       SELECT
//         c.id,
//         c.listing_id,
//         c.buyer_id,
//         c.seller_id,
//         c.created_at,

//         l.title AS listing_title,

//         -- OTHER USER INFO (THE PERSON I AM CHATTING WITH)
//         u.id AS otherUserId,
//         CONCAT(u.first_name, ' ', u.last_name) AS otherUserName,
//         u.avatar AS otherUserAvatar

//       FROM chats c
//       JOIN listings l ON c.listing_id = l.id

//       -- FIND THE OTHER USER (IF I AM BUYER → OTHER IS SELLER, IF I AM SELLER → OTHER IS BUYER)
//       JOIN users u
//         ON u.id = CASE
//           WHEN c.buyer_id = ? THEN c.seller_id
//           ELSE c.buyer_id
//         END

//       WHERE c.buyer_id = ? OR c.seller_id = ?
//       ORDER BY c.created_at DESC
//       `,
//       [userId, userId, userId],
//     );

//     res.json(rows);
//   } catch (err) {
//     console.error("GET CHATS ERROR:", err);
//     res.status(500).json({ message: "Failed to fetch chats" });
//   }
// };

exports.getMyChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT 
         c.id,
         c.listing_id,
         c.buyer_id,
         c.seller_id,
         c.created_at,
         l.title AS listing_title,

         -- 🔥 OTHER USER DETAILS
         u.id AS otherUserId,
         CONCAT(u.first_name, ' ', u.last_name) AS otherUserName,
         u.avatar AS otherUserAvatar

       FROM chats c
       JOIN listings l ON c.listing_id = l.id

       -- 🔥 PICK THE OTHER PERSON
       JOIN users u 
         ON u.id = IF(c.buyer_id = ?, c.seller_id, c.buyer_id)

       WHERE c.buyer_id = ? OR c.seller_id = ?
       ORDER BY c.created_at DESC`,
      [userId, userId, userId],
    );

    res.json(rows);
  } catch (err) {
    console.error("GET CHATS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

// 🔴 GET MESSAGES
exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const [rows] = await db.query(
      `SELECT 
        m.id,
        m.chat_id,
        m.sender_id,
        m.message,
        m.created_at
       FROM messages m
       WHERE m.chat_id = ?
       ORDER BY m.created_at ASC`,
      [chatId],
    );

    res.json(rows);
  } catch (err) {
    console.error("GET MESSAGES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { text } = req.body;
    const senderId = req.user.id;

    if (!chatId || !text) {
      return res.status(400).json({ message: "Missing chatId or message" });
    }

    const [result] = await db.query(
      `INSERT INTO messages (chat_id, sender_id, message)
       VALUES (?, ?, ?)`,
      [chatId, senderId, text],
    );

    const [rows] = await db.query(
      `SELECT 
         m.id,
         m.chat_id,
         m.message,
         m.created_at,
         u.id AS sender_id,
         CONCAT(u.first_name, ' ', u.last_name) AS sender_name,
         u.avatar AS sender_avatar
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.id = ?`,
      [result.insertId],
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
};
