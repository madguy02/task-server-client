import * as express from 'express'
const app = express()

const http = require("http").Server(app);
const io = require("socket.io")(http)
const Timer = require('tiny-timer')
const stdin = process.openStdin();
const ioC = require("socket.io-client")

console.log("verifier  has connected");
const ioClient = ioC.connect('http://localhost:3001')
let states: any = []

ioClient.on("message", (msg: any) => {
    console.log("You have received: " + msg)
    let count  = 0
    let timer = new Timer()
    timer.on('done', () => {
        console.log('time up!!')
        count ++
        if (states.length == 3) {
            process.exit(22)
        }
        else {
            io.emit("message","score not evaluated")
            states.push(count)

        }
    })
    timer.start(5000)
    stdin.addListener("data", function(d) {
            timer.stop()
            io.emit("message", d)
            stdin.removeAllListeners("data")
    })
})

io.listen(3000)