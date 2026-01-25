require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 8080;

/* -------------------- MIDDLEWARES -------------------- */
app.use(cors());
app.use(express.json()); // body parser
app.use("/uploads", express.static("uploads"));

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/listings", require("./routes/listingRoutes"));
app.use("/api/favourites", require("./routes/favouriteRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));

/* -------------------- SOCKET SETUP -------------------- */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend port
    methods: ["GET", "POST"],
  },
});

// 🔥 MAKE SOCKET AVAILABLE INSIDE CONTROLLERS
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 🔥 TRACK ONLINE USERS
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🔵 Socket connected:", socket.id);

  // USER JOINS WITH HIS USER ID
  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("🟢 User online:", userId);
  });

  // SEND MESSAGE REALTIME
  socket.on("sendMessage", ({ receiverId, message }) => {
    const receiverSocket = onlineUsers.get(receiverId);

    if (receiverSocket) {
      io.to(receiverSocket).emit("newMessage", message);
    }
  });

  socket.on("disconnect", () => {
    for (let [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    }
    console.log("🔴 User disconnected");
  });
});

/* -------------------- START SERVER -------------------- */
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
