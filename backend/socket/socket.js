import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["https://chat-spark.onrender.com/"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    console.log("User ID from handshake:", userId);

    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
        console.log("User Socket Map after connection:", userSocketMap);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        console.log("User Socket Map after disconnection:", userSocketMap);
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});


export { app, io, server };