const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors"); // Import the cors package
const { createConnection } = require("./lib/db");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow requests from your frontend
    methods: ["GET", "POST"], // Allow these HTTP methods
  },
});

// Use CORS middleware to allow cross-origin requests
app.use(cors());

app.use(express.json());

// Route to fetch private messages
app.get("/api/messages", async (req, res) => {
  const senderId = req.query.senderId;
  const receiverId = req.query.receiverId;

  if (!senderId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const conn = await createConnection();
    const [rows] = await conn.execute(
      `SELECT * FROM private_messages 
    WHERE (sender_id = ? AND receiver_id = ?) 
    OR (sender_id = ? AND receiver_id = ?)
    ORDER BY sent_at ASC;`,
      [7, 5, 5, 7]
    );
    await conn.end();

    return res.json(rows);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("private-message", async (data) => {
    try {
      const conn = await createConnection();
      const [result] = await conn.execute(
        "INSERT INTO private_messages (sender_id, receiver_id, content) VALUES (?, ?, ?)",
        [data.senderId, data.receiverId, data.content]
      );
      await conn.end();

      io.to(`user_${data.receiverId}`).emit("new-message", {
        id: result.insertId,
        sender_id: data.senderId,
        content: data.content,
        sent_at: new Date(),
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("join-user", (senderId) => {
    socket.join(`user_${senderId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(3003, () => {
  console.log("Server is running on port 3003");
});
