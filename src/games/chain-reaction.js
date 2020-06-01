const { io } = require('../app')
const {
    addUser,
    removeUser,
    getUser,
    isPaired,
    getOpponent,
    getUsersInRoom,
    getPairedUsers,
    getUnpairedUsers
} = require('../utils/chain-reaction-users')

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

    socket.on('pair-chain-reaction', (callback) => {
        try {
            if (isPaired(socket.id)) {
                const opponent = getOpponent(socket.id)
                callback(true, opponent.id)
                io.to(opponent.id).emit('start-chain-reaction', opponent.id)
                io.to(opponent.id).emit('freezePlayer-chain-reaction')
                
            }
            else {
                callback(false, 0)
            }
        }
        catch (e) {
            console.log(e)
        }
    })
    socket.on('click-chain-reaction', (grid, player, callback) => {
        try {
            const user = getUser(socket.id)
            io.in(user.room).emit('move-chain-reaction', grid, player)
            callback()
        }
        catch (e) {
            console.log(e)
        }
    })

    socket.on('freeze-chain-reaction', (valid_move) => {
        try {
            if (valid_move) {
                const user = getUser(socket.id)
                socket.to(user.room).emit('unfreezeOpponent-chain-reaction')
                io.to(socket.id).emit('freezePlayer-chain-reaction')
            }
            else {
                console.log("invalid move")
            }
        }
        catch (e) {
            console.log(e)
        }
    })

    socket.on('winner-chain-reaction', (user, not_opponent) => {
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