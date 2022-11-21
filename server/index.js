const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
    // console.log("A user connected.");
    io.emit("message", {
        content: `${socket.id.substring(0, 5)} Joined!`,
        author: "System",
        type: "connection",
        timestamp: new Date()
    });

    socket.on("message", (message) => {
        // console.log(message);
        // io.emit("author", socket.id);
        io.emit("message", {
            content: message.content,
            author: message.author,
            type: "message",
            timestamp: new Date(),
        });
    });

    socket.on("disconnect", () => {
        // console.log("A user disconnected.");
        io.emit("message", {
            content: `${socket.id.substring(0, 5)} Leaved!`,
            author: "System",
            type: "connection"
        });
    });
});

httpServer.listen(port, () => console.log("Server is running. Port:", port));
