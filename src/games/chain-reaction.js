const { io } = require('../app')
const { addUser, removeUser, getUser, isPaired, getOpponent, getUsersInRoom, getPairedUsers, getUnpairedUsers } = require('../utils/users')

io.on('connection', (socket) => {
    console.log('Web socket connected')
    socket.on('join-chain-reaction', (username, callback) => {
        try {
            const { error, user } = addUser({ id: socket.id, username:username })

            if (error) {
                return callback(error)
            }
            
            socket.join(user.room)
            console.log('Paired on join', getPairedUsers())
            console.log('Unpaired', getUnpairedUsers())
            callback()
        }
        catch (e) {
            console.log(e)
        }
    })

    socket.on('pair', (callback) => {
        try {
            if (isPaired(socket.id)) {
                const opponent = getOpponent(socket.id)
                callback(true, opponent.id)
                io.to(opponent.id).emit('start', opponent.id)
                io.to(opponent.id).emit('freezePlayer')
                
            }
            else {
                callback(false, 0)
            }
        }
        catch (e) {
            console.log(e)
        }
    })
    socket.on('click', (grid, player, callback) => {
        try {
            const user = getUser(socket.id)
            io.in(user.room).emit('move', grid, player)
            callback()
        }
        catch (e) {
            console.log(e)
        }
    })

    socket.on('freeze', (valid_move) => {
        try {
            if (valid_move) {
                const user = getUser(socket.id)
                socket.to(user.room).emit('unfreezeOpponent')
                io.to(socket.id).emit('freezePlayer')
            }
            else {
                console.log("invalid move")
            }
        }
        catch (e) {
            console.log(e)
        }
    })

    socket.on('winner', (user, not_opponent) => {
        try{        
            if (not_opponent) {
                const winner = getUser(user)
                console.log(winner)
            }
            else {
                const winner = getOpponent(user)
                console.log(winner)
            }
        }
        catch (e) {
            console.log(e)
        }
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        console.log('Paired', getPairedUsers())
        console.log('Unpaired', getUnpairedUsers())
    })

})