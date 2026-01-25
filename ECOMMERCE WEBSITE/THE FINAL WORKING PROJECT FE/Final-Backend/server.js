// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 8080;

// /* -------------------- MIDDLEWARES -------------------- */
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// /* -------------------- ROUTES -------------------- */
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/listings", require("./routes/listingRoutes"));
// app.use("/api/favourites", require("./routes/favouriteRoutes"));
// app.use("/api/chats", require("./routes/chatRoutes"));

// // 🔥 ADMIN ROUTES (NEW – VERY IMPORTANT)
// app.use("/api/admin", require("./routes/adminRoutes"));

// /* -------------------- START SERVER -------------------- */
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// server.js

require("dotenv").config();

const app = require("./app"); // 🔥 IMPORT app.js (THIS IS THE FIX)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
