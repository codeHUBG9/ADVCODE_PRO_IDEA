const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const Message = require("./models/Message");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

// Load environment variables
const envFile = process.env.NODE_ENV === "production" 
  ? "config/config.env" 
  : "config/config.env";

require("dotenv").config({
  path: path.resolve(__dirname, envFile),
});

// Initialize Express
const app = express();

// Enable CORS
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',  // Adjust your front-end origin here
}));

// Use Morgan for logging requests (combined for detailed logs)
app.use(morgan("combined"));  // Use 'tiny' or 'dev' for simpler logs

app.use(express.json());

// MongoDB Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // Allow all origins for now
    methods: ["GET", "POST"],
  },
});

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a chat room
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  // Send message
  socket.on("sendMessage", async (messageData) => {
    const { sender, room, content } = messageData;

    // Save message to the database
    const message = await Message.create({ sender, room, content });

    // Broadcast to the room
    io.to(room).emit("receiveMessage", message);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
