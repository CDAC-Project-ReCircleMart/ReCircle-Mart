const db = require("../config/db");

/* ===================== DASHBOARD STATS ===================== */

exports.getDashboardStats = async (req, res) => {
  try {
    const [[usersCount]] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users",
    );

    const [[listingsCount]] = await db.query(
      "SELECT COUNT(*) AS totalListings FROM listings",
    );

    const [[visitsToday]] = await db.query(
      "SELECT COUNT(*) AS totalVisitsToday FROM visits WHERE DATE(created_at) = CURDATE()",
    );

    const [[todayListings]] = await db.query(
      "SELECT COUNT(*) AS todayListings FROM listings WHERE DATE(created_at) = CURDATE()",
    );

    res.json({
      totalUsers: usersCount.totalUsers,
      totalListings: listingsCount.totalListings,
      totalVisitsToday: visitsToday.totalVisitsToday,
      todayListings: todayListings.todayListings,
    });
  } catch (err) {
    console.error("❌ ADMIN DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

/* ===================== CHART APIS ===================== */

exports.getUsersListingsChart = async (req, res) => {
  try {
    const [users] = await db.query(`
      SELECT DATE(created_at) as date, COUNT(*) as users
      FROM users
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at)
    `);

    const [listings] = await db.query(`
      SELECT DATE(created_at) as date, COUNT(*) as listings
      FROM listings
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at)
    `);

    res.json({ users, listings });
  } catch (err) {
    console.error("❌ ADMIN BAR CHART ERROR:", err);
    res.status(500).json({ message: "Failed to load bar chart data" });
  }
};

exports.getVisitsChart = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE(created_at) as date, COUNT(*) as visits
      FROM visits
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at)
    `);

    res.json(rows);
  } catch (err) {
    console.error("❌ ADMIN VISITS CHART ERROR:", err);
    res.status(500).json({ message: "Failed to load visits chart" });
  }
};

exports.getCategoryChart = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT category, COUNT(*) as total
      FROM listings
      GROUP BY category
    `);

    res.json(rows);
  } catch (err) {
    console.error("❌ ADMIN CATEGORY CHART ERROR:", err);
    res.status(500).json({ message: "Failed to load category chart" });
  }
};

/* ===================== CALENDAR (EVENTS) ===================== */

/* 🔹 GET ALL EVENTS */
exports.getAllEvents = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM admin_events ORDER BY event_date ASC",
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ ADMIN GET EVENTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

/* 🔹 GET EVENTS BY DATE */
exports.getEventsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    const [rows] = await db.query(
      "SELECT * FROM admin_events WHERE event_date = ? ORDER BY created_at",
      [date],
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ ADMIN GET EVENTS BY DATE ERROR:", err);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

/* 🔹 ADD NEW EVENT (IMPORTANT) */
exports.addEvent = async (req, res) => {
  try {
    const { title, event_date, description } = req.body;

    if (!title || !event_date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    const [result] = await db.query(
      `INSERT INTO admin_events (title, event_date, description)
       VALUES (?, ?, ?)`,
      [title, event_date, description || null],
    );

    const [[newEvent]] = await db.query(
      "SELECT * FROM admin_events WHERE id = ?",
      [result.insertId],
    );

    res.json(newEvent);
  } catch (err) {
    console.error("❌ ADMIN ADD EVENT ERROR:", err);
    res.status(500).json({ message: "Failed to add event" });
  }
};

/* 🔹 DELETE EVENT */
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM admin_events WHERE id = ?", [id]);

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("❌ ADMIN DELETE EVENT ERROR:", err);
    res.status(500).json({ message: "Failed to delete event" });
  }
};

/* ===================== MANAGE USERS ===================== */

exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const offset = (page - 1) * limit;

    const [rows] = await db.query(
      `
      SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.avatar,
        u.role,
        COUNT(l.id) AS totalListings
      FROM users u
      LEFT JOIN listings l ON u.id = l.user_id
      WHERE 
        u.id LIKE ? OR
        u.first_name LIKE ? OR
        u.last_name LIKE ? OR
        u.email LIKE ?
      GROUP BY u.id
      ORDER BY u.created_at DESC
      LIMIT ? OFFSET ?
      `,
      [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        limit,
        offset,
      ],
    );

    const [[count]] = await db.query(
      `
      SELECT COUNT(*) as total FROM users
      WHERE 
        id LIKE ? OR
        first_name LIKE ? OR
        last_name LIKE ? OR
        email LIKE ?
      `,
      [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`],
    );

    res.json({
      users: rows,
      total: count.total,
      page,
      totalPages: Math.ceil(count.total / limit),
    });
  } catch (err) {
    console.error("❌ ADMIN GET USERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (Number(id) === req.user.id) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    await db.query("DELETE FROM users WHERE id = ?", [id]);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ ADMIN DELETE USER ERROR:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    await db.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);

    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("❌ ADMIN UPDATE USER ERROR:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

/* ===================== LISTINGS MANAGEMENT ===================== */

exports.getAllListings = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT l.*, 
             CONCAT(u.first_name, ' ', u.last_name) AS seller_name,
             u.email AS seller_email
      FROM listings l
      JOIN users u ON l.user_id = u.id
      ORDER BY l.created_at DESC
      `,
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ ADMIN GET LISTINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM listings WHERE id = ?", [id]);

    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("❌ ADMIN DELETE LISTING ERROR:", err);
    res.status(500).json({ message: "Failed to delete listing" });
  }
};
