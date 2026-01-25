// app.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express(); // 🔴 CREATE APP FIRST

/* ================= MIDDLEWARE ================= */

// Allow React frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
  }),
);

// Logging
app.use(morgan("dev"));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTES ================= */

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Backend running successfully 🚀" });
});

// 🔴 ROUTE FILES (KEEP ALL YOUR OLD ONES)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/listings", require("./routes/listingRoutes"));
app.use("/api/messages", require("./routes/chatRoutes")); // your current chat route
app.use("/api/favourites", require("./routes/favouriteRoutes"));

// 🔥 ADMIN ROUTES (NEW – VERY IMPORTANT)
app.use("/api/admin", require("./routes/adminRoutes"));

/* ================= ERROR HANDLING ================= */

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
