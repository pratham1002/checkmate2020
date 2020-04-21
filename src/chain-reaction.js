const { io } = require('./app')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

io.on('connection', (socket) => {
    console.log('Web socket connected')

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        callback()
    })

})