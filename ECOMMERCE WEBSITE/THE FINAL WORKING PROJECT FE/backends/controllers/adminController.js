// controllers/adminController.js

const db = require("../config/db");

/* ===================== USERS MANAGEMENT ===================== */

/* 🔹 GET ALL USERS (ADMIN) */
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, first_name, last_name, email, avatar, role, created_at FROM users ORDER BY created_at DESC",
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ ADMIN GET USERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* 🔹 DELETE USER */
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // ❗ Prevent admin from deleting himself
    if (Number(userId) === req.user.id) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    await db.query("DELETE FROM users WHERE id = ?", [userId]);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ ADMIN DELETE USER ERROR:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

/* 🔹 MAKE USER ADMIN */
exports.makeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    await db.query("UPDATE users SET role = 'admin' WHERE id = ?", [userId]);

    res.json({ message: "User promoted to admin" });
  } catch (err) {
    console.error("❌ ADMIN MAKE ADMIN ERROR:", err);
    res.status(500).json({ message: "Failed to make admin" });
  }
};

/* 🔹 REMOVE ADMIN ROLE (MAKE NORMAL USER) */
exports.removeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    // ❗ Prevent admin from removing his own admin role
    if (Number(userId) === req.user.id) {
      return res
        .status(400)
        .json({ message: "You cannot remove your own admin role" });
    }

    await db.query("UPDATE users SET role = 'user' WHERE id = ?", [userId]);

    res.json({ message: "Admin role removed" });
  } catch (err) {
    console.error("❌ ADMIN REMOVE ADMIN ERROR:", err);
    res.status(500).json({ message: "Failed to remove admin role" });
  }
};

/* ===================== LISTINGS MANAGEMENT ===================== */

/* 🔹 GET ALL LISTINGS (ADMIN) */
exports.getAllListings = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT l.*, 
              CONCAT(u.first_name, ' ', u.last_name) AS seller_name,
              u.email AS seller_email
       FROM listings l
       JOIN users u ON l.user_id = u.id
       ORDER BY l.created_at DESC`,
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ ADMIN GET LISTINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

/* 🔹 DELETE LISTING */
exports.deleteListing = async (req, res) => {
  try {
    const { listingId } = req.params;

    await db.query("DELETE FROM listings WHERE id = ?", [listingId]);

    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("❌ ADMIN DELETE LISTING ERROR:", err);
    res.status(500).json({ message: "Failed to delete listing" });
  }
};

/* ===================== DASHBOARD STATS ===================== */

/* 🔹 GET ADMIN DASHBOARD STATS */
exports.getDashboardStats = async (req, res) => {
  try {
    const [[usersCount]] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users",
    );
    const [[listingsCount]] = await db.query(
      "SELECT COUNT(*) AS totalListings FROM listings",
    );
    const [[chatsCount]] = await db.query(
      "SELECT COUNT(*) AS totalChats FROM chats",
    );
    const [[messagesCount]] = await db.query(
      "SELECT COUNT(*) AS totalMessages FROM messages",
    );

    res.json({
      totalUsers: usersCount.totalUsers,
      totalListings: listingsCount.totalListings,
      totalChats: chatsCount.totalChats,
      totalMessages: messagesCount.totalMessages,
    });
  } catch (err) {
    console.error("❌ ADMIN DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
