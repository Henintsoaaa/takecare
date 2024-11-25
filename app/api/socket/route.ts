import { Server } from "socket.io";
import { createConnection } from "@/lib/db";

const ioHandler = async (req: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("private-message", async (data) => {
        try {
          const conn = await createConnection();
          const [result]: any = await conn.execute(
            "INSERT INTO private_messages (sender_id, receiver_id, content) VALUES (?, ?, ?)",
            [data.senderId, data.receiverId, data.content]
          );
          await conn.end();

          // Emit to specific user
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

      socket.on("join-user", (userId) => {
        socket.join(`user_${userId}`);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }
  res.end();
};

export const GET = ioHandler;
