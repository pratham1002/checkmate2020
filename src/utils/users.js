const users = []
const pairedUsers = []

const addUser = ({ id, username }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    
    // Validate the data
    if (!username) {
        return {
            error: 'Username is required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Pair 2 users in a single room
    if (users.length != 0) {
        const user = { id, username, room: users[0].room }
        pairedUsers.push(users[0])
        pairedUsers.push(user)
        users.splice(0, 1)
        return { user }
    }

    // Store user
    const user = { id, username, room: id }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}