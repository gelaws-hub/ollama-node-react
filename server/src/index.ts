import express from "express";
import http from "http";
import ollama from "ollama";
import cors from "cors";
import { Server } from "socket.io";
import 'dotenv/config';

const app = express();
const server = http.createServer(app);

let totalUsers = 0;

app.use(
  cors({
    origin: process.env.ORIGIN_URL?.split(","),
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

console.log("ORIGIN_URL", process.env.ORIGIN_URL?.split(","))

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN_URL?.split(","),
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  totalUsers++;
  console.log(`Total users connected: ${totalUsers}`);

  socket.on("chat", async (message) => {
    console.log("Received message:", message);
    try {
      const response = await ollama.chat({
        model: process.env.MODEL_NAME || "deepseek-r1:7b",
        messages: [{ role: "user", content: message }],
        stream: true,
      });

      for await (const part of response) {
        socket.emit("response", part.message.content);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      socket.emit("response", "Error processing your request.");
    }
  });

  socket.on("disconnect", () => {
    totalUsers--;
    console.log("A user disconnected");
    console.log(`Total users connected: ${totalUsers}`);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
