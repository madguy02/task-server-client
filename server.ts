import express from 'express'

const app = express()

app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
let io = require("socket.io")(http)
let stdin = process.openStdin();

io.on("connection", function(socket: any) {
    console.log("user has connected");

stdin.addListener("data", function(d) {
    console.log("you entered: " + d.toString().trim());
    socket.emit("message",d.toString().trim())
  });
});

console.log("server has started")
io.listen(3001)