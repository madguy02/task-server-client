## SERVER CLIENT GAME OF SOCKETS

Logic: Its pretty simple, the server is listening on a port lets say 3001, client is listening on 3000. However there should be another connection made, as the server and client both receives as well as sends messages, it has to have two clients as well, the clients are connected
in a criss cross fashion here.

Game:
    1. Server gets started first
    2. When the client starts, server gets a notification that client has connected
    3. Server sends a message to client
    4. Client receives the message and tries to send the exact message back to server for evaluation
    5. Server evaluates it, and then rewards points based on if the answer is correct, provided the client sends within 5 secs, otherwise time up
    6. If its a time up points awarded: 0 , else if its correct: points awarded is 1 else -1
    7. If max score of 10 or -3 is received, the server closes off
    8. if the client doesn't respond for 3 times in a row, the client gets disconnected.

Built On: TypeScript, socket.io

## Running the game

    1. First `npm install` (built quickly on npm, but yarn is recommended, as its a better dependency manager than npm)
    2. Run the server: `ts-node server.ts` (on 1 terminal)
    3. Run the client: `ts-node client.ts` (on another terminal)
    4. type a message from server
    5. See, if client receives it, if yes, try to copy the message in 5 seconds and see what points are rewarded


Enjoy!!!