var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const stdin = process.openStdin();

let text = ''
let score = 0

io.on('connection', function (socket: any){

   console.log('connection');
    stdin.addListener("data", function(d) {
        console.log("you entered: " + d)
        socket.emit("message",d.toString().trim())
        text = d.toString().trim()
        stdin.removeAllListeners("data")
    })

  socket.on('message', function (msg: any) {


        console.log('Client Sent: ' +  msg);
        if (msg === text) {
            score = score + 1
            socket.emit("score", score)

        }
        else if (msg === "time up!!!") {
            score = score + 0
            socket.emit("score", score)
        }
        else {
            score = score-1
            console.log(score)
            socket.emit("score", score)
        }

        stdin.addListener("data", function(d) {
            console.log("you entered: " + d)
            socket.emit("message",d.toString().trim())
            text = d.toString().trim()
            stdin.removeAllListeners("data")
        })

  });

});

http.listen(3000, function () {
  console.log('listening on *:3000');
});