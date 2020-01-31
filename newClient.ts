const ioC = require("socket.io-client")
const SERVER_URL = process.env.SERVER_URL
let socket = ioC.connect(SERVER_URL);
let std = process.openStdin();
const Timer = require('tiny-timer')
let setTimerVal = 5000
let attempt = 0
import * as util from './util'
socket.on('connect', function (socket: any) {
    console.log('Connected!');

});
socket.on("message", function(msg: any) {
  console.log(msg)
  attempt = attempt + 1
  let count = 0
  let timer = new Timer()
  timer.on('done', () => {
    console.log("time up!!")
    count ++;
    socket.emit("message", "time up!!!")
  })
  if (util.isPrime(attempt)) {
    setTimerVal = setTimerVal - 100
    console.log(setTimerVal)
    timer.start(setTimerVal)
    std.addListener("data", function(d) {
    timer.stop()
    console.log("You Entered: " + d)
    socket.emit('message', d.toString().trim())
    std.removeAllListeners("data")
    })
  }
  else {
    timer.start(setTimerVal)
    std.addListener("data", function(d) {
    timer.stop()
    console.log("You Entered: " + d)
    socket.emit('message', d.toString().trim())
    std.removeAllListeners("data")
    })
  }

})

socket.on("score", function(msg: any) {
  console.log("Your current score is: " + msg)
})

