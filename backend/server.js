require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const sequelize = require("./config/db");
const { sequelize: seq, User, Listing, Message } = require("./models");

const authRoutes = require("./routes/auth");
const listingRoutesFactory = require("./routes/listings");
const adminRoutes = require("./routes/admin");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "*" },
});

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutesFactory(upload));
app.use("/api/admin", adminRoutes);

// socket.io chat
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("join", ({ userId }) => {
    socket.join(`user_${userId}`);
  });

  socket.on("message", async (payload) => {
    // payload: { fromId, toId, listingId, content }
    try {
      const msg = await Message.create({
        content: payload.content,
        fromId: payload.fromId,
        toId: payload.toId,
        listingId: payload.listingId,
      });
      const full = await Message.findByPk(msg.id, {
        include: ["from", "to", "Listing"],
      });
      io.to(`user_${payload.toId}`).emit("message", full);
      io.to(`user_${payload.fromId}`).emit("message", full);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => console.log("socket disconnected", socket.id));
});

// start server and sync DB
const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    // sync models
    await sequelize.sync({ alter: true });
    server.listen(PORT, () => console.log("Server listening on", PORT));
  } catch (err) {
    console.error("Unable to connect to DB", err);
    process.exit(1);
  }
})();
