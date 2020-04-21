const { io } = require('./app')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

io.on('connection', (socket) => {
    console.log('yes')
})