const { io } = require('./app')
const { addUser, removeUser, getUser, getUsersInRoom, getPairedUsers, getUnpairedUsers } = require('./utils/users')

io.on('connection', (socket) => {
    console.log('Web socket connected')
    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)
        console.log('Paired', getPairedUsers())
        console.log('Unpaired', getUnpairedUsers())
        callback()
    })

    socket.on('click', (info, player) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('move', info, player)
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        console.log('Paired', getPairedUsers())
        console.log('Unpaired', getUnpairedUsers())
    })

})