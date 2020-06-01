const { io } = require("../app")

const {
    addUser,
    removeUser,
    getUser,
    isPaired,
    getOpponent,
    getUsersInRoom,
    getPairedUsers,
    getUnpairedUsers
} = require('../utils/tic-tac-toe-users')

io.on('connection', (socket) => { 
    console.log('Connection established!')

    socket.on('join-tic-tac-toe', (username, callback) => {
        try {
            const { error, user } = addUser({ id: socket.id, username: username })

            if (error) {
                return callback(error)
            }

            socket.join(user.room)

            console.log('Paired on join', getPairedUsers())
            console.log('Unpaired', getUnpairedUsers())

            callback('joined')
        }
        catch (e) {
            console.log(e)
        }
    })

    socket.on('pair-tic-tac-toe', (username) => {
        try {
            if (isPaired(socket.id)) {
                console.log(username)
                const user = getUser(username)
                // const opponent = getOpponent(socket.id)
                // callback(true, opponent.id)
                socket.to(user.room).emit('start-tic-tac-toe')
                // io.to(opponent.id).emit('freezePlayer')
                
            }
            else {
                console.log('unpaired')
                //callback(false)
            }
        }
        catch (e) {
            console.log(e)
        }
    })

    socket.on('play-tic-tac-toe', (opponent, username, divId) => {
        const user = getUser(username)
        // console.log(user.room)
        socket.to(user.room).emit('opponentPlayed-tic-tac-toe', opponent, divId);
        // callback();
    })

    socket.on('end-tic-tac-toe', (player) => {
        // winner recieved from client side, run database changes here
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        console.log('Paired', getPairedUsers())
        console.log('Unpaired', getUnpairedUsers())
    })
})