// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 🔴 Get token from header: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];

    // 🔴 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔴 Attach user info to request (for later use in controllers)
    req.user = decoded;
    // decoded should contain: { id, email, role }

    next(); // allow request to continue
  } catch (err) {
    console.error("❌ Auth error:", err);

    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
