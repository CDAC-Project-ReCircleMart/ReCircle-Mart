require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

/* -------------------- MIDDLEWARES -------------------- */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/listings", require("./routes/listingRoutes"));
app.use("/api/favourites", require("./routes/favouriteRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
