const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", (socket) => {
    console.log("A new client connected");
    socket.on("send-location", (data) => {
        console.log("Received location:", data);
       
        io.emit("receive-location", { id: socket.id, ...data});
    });

    socket.on("disconnect", function(){
       io.emit("user-disconnected", socket.id);
    });
});


app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000);
