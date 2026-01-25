// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 🔴 GET TOKEN FROM HEADER
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];

    // 🔴 VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");

    // 🔴 ATTACH USER ID ONLY (THIS IS WHAT ALL CONTROLLERS USE)
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    console.error("❌ Auth error:", err);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
