const users = []
const pairedUsers = []

const addUser = ({ id, username }) => {
    try {
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
        const user = { id, username, room: id + 'cr' }
        users.push(user)
        return { user }
    }
    catch (e) {
        
    }
}

const removeUser = (id) => {
    let index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }

    index = pairedUsers.findIndex((user) => user.id === id)
    if (index !== -1) {
        const removedUser = pairedUsers.splice(index, 1)[0]
        const room = removedUser.room
        const pairIndex = pairedUsers.findIndex((user) => user.room === room)
        const removedPairUser = pairedUsers.splice(pairIndex, 1)[0]
        users.push(removedPairUser)
        return removedUser
    }
}

const getUser = (id) => {
    const pairedUser = pairedUsers.find((user) => user.id === id)
    if (!pairedUser) {
        return users.find((user) => user.id === id)
    }
    return pairedUser
}

const isPaired = (id) => {
    const pairedUser = pairedUsers.find((user) => user.id === id)
    if (!pairedUser) {
        return false
    }
    return true
}

const getOpponent = (id) => {
    const pairedUser = pairedUsers.find((user) => user.id === id)
    const opponent = pairedUsers.find((user) => {
        return user.room === pairedUser.room && user.id != id
    })
    return opponent
}
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return pairedUsers.filter((user) => user.room === room)
}

const getPairedUsers = () => {
    return pairedUsers
}

const getUnpairedUsers = () => {
    return users
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    isPaired,
    getOpponent,
    getUsersInRoom,
    getPairedUsers,
    getUnpairedUsers
}