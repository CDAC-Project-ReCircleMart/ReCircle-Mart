require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();   // 🔴 APP CREATED FIRST
const PORT = process.env.PORT || 8080;

// 🔴 MIDDLEWARES (ORDER MATTERS)
app.use(cors());
app.use(express.json());          // 🔴 BODY PARSER (FIXES UPDATE)
app.use("/uploads", express.static("uploads"));

// 🔴 ROUTES (ONLY THOSE THAT ACTUALLY EXIST)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/listings", require("./routes/listingRoutes"));
app.use("/api/favourites", require("./routes/favouriteRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));
// ❌ REMOVED userRoutes BECAUSE FILE DOES NOT EXIST

// 🔴 TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔴 START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
