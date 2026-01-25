// controllers/authController.js

const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// // 🔴 REGISTER USER
// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, icon } = req.body;

//     // Check if user exists
//     const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [
//       email,
//     ]);

//     if (existing.length > 0) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user
//     const [result] = await db.query(
//       "INSERT INTO users (first_name, last_name, email, password, avatar) VALUES (?, ?, ?, ?, ?)",
//       [firstName, lastName, email, hashedPassword, icon],
//     );

//     res.json({ message: "Registration successful" });
//   } catch (err) {
//     console.error("❌ Register error:", err);
//     res.status(500).json({ message: "Registration failed" });
//   }
// };

exports.register = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body); // 🔴 DEBUG
    console.log("REGISTER FILE:", req.file); // 🔴 DEBUG

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const icon = req.body.icon;

    if (!firstName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔴 CHECK IF USER EXISTS
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔴 PRIORITY: FILE > ICON
    let avatarPath = null;

    if (req.file) {
      avatarPath = `/uploads/${req.file.filename}`;
    } else if (icon) {
      avatarPath = icon;
    }

    await db.query(
      "INSERT INTO users (first_name, last_name, email, password, avatar) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword, avatarPath],
    );

    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error("❌ Register error FULL:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};

// 🔴 LOGIN USER (🔥 FIXED VERSION)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔴 FIND USER
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    // 🔴 CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🔴 CREATE JWT TOKEN (IMPORTANT: SECRET MUST EXIST)
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "mysecretkey", // 🔴 fallback so it NEVER fails
      { expiresIn: "7d" },
    );

    // 🔴 SEND TOKEN + CLEAN USER OBJECT
    // res.json({
    //   token, // 🔥 THIS IS WHAT FRONTEND SAVES
    //   user: {
    //     id: user.id,
    //     first_name: user.first_name,
    //     last_name: user.last_name,
    //     email: user.email,
    //     avatar: user.avatar,
    //   },
    // });

    res.json({
      token,
      user: {
        id: user.id,
        first_name: user.first_name, // 🔴 MUST MATCH TABLE
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar,
        created_at: user.created_at, // 🔴 IMPORTANT FOR JOINED DATE
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
