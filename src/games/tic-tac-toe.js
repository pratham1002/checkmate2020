const { io } = require("../app")

const { addUser, removeUser, getUser, getUsersInRoom } = require('../utils/user')

io.on("connection", (socket) => { 
    console.log("Connection established!")
    socket.on('join-tic-tac-toe', (username, room, callback) => {
        const { error, user } = addUser({ id: socket.id, username: username, room: room });

        if (error) {
            return callback(error);
        }
        socket.join(room);

        callback("joined");
    })

    socket.on('play-tic-tac-toe', (opponent, username, divId) => {
        const user = getUser(username)
        // console.log(user.room)
        socket.to(user.room).emit('opponentPlayed-tic-tac-toe', opponent, divId);
        // callback();
    })

    socket.on('endGame-tic-tac-toe', (player) => {
        // winner recieved from client side, run database changes here
    })
})