import * as express from 'express'
const app = express()

const http = require("http").Server(app);
const io = require("socket.io")(http)
const stdin = process.openStdin();
// const ioC = require("socket.io-client")

let text = ''
let score = 0
let nonEvaluation = 0

io.on("connection", function(socket: any) {
    console.log("user has connected");

    stdin.addListener("data", function(d) {
        console.log("you entered: " + d.toString().trim());
        nonEvaluation = 0
        socket.emit("message",d.toString().trim())
        text = d.toString().trim();
    });

});

io.on("message", function(msg: any){
    console.log(msg)
})





// const ioClient = ioC.connect(`http://localhost:3000`);
// ioClient.on("message", (msg: any) => {

//     if (score <=9 && score !== -3) {
//         console.info("Client sent : " + msg)
//     if (msg.toString().trim() === text) {
//         if (nonEvaluation === 0) {
//             score = score+1
//             console.log("Current Score: " + score)
//         }
//         else {
//             score = score + 0
//             console.log("Value sent after time out, score remains same: " + score)
//         }
//     }
//     else if (msg.toString().trim() === 'score not evaluated') {
//         nonEvaluation += 1
//         score = score + 0
//     }
//     else {
//         if (nonEvaluation === 0) {
//             score = score - 1
//             console.log("Current Score: " + score)
//         }
//         else {
//             score = score + 0
//         }
//     }

// }
// else {
//     console.log("Maximum score reached!!!!", score)
//     nonEvaluation = 0
//     return process.exit(22)
// }

// });

console.log("server has started")
 io.listen(3001)
