class WebSockets {
  users = []
  constructor() {
    this.users = this.users ? this.users : []
  }

  connection = (client) => {
    // event fired when the chat room is disconnected
    client.on('disconnect', () => {
      console.log(this)
      this.users = this.users.filter((user) => user.socketId !== client.id)
    })
    // add identity of user mapped to the socket id
    client.on('identity', (userId) => {
      this.users.push({
        socketId: client.id,
        userId: userId,
      })
    })
    // subscribe person to chat & other user as well
    client.on('subscribe', (room, otherUserId = '') => {
      this.subscribeOtherUser(room, otherUserId)
      client.join(room)
    })
    // mute a chat room
    client.on('unsubscribe', (room) => {
      client.leave(room)
    })

    client.on('callUser', (data) => {
      let userSocket = this.users.find(
        (user) => user.userId === data.userToCall
      )
      if (userSocket && userSocket.socketId)
        global.io.to(userSocket.socketId).emit('hey', {
          signal: data.signalData,
          from: data.from,
        })
    })

    client.on('acceptCall', (data) => {
      let userSocket = this.users.find((user) => user.userId === data.to)
      if (userSocket && userSocket.socketId) {
        global.io.to(userSocket.socketId).emit('callAccepted', data.signal)
        console.log("Call Accepted", data.signal)
      }
    })
  }

  subscribeOtherUser = (room, otherUserId) => {
    const userSockets = this.users.filter((user) => user.userId === otherUserId)
    userSockets.map((userInfo) => {
      const socketConn = global.io.sockets.connected[userInfo.socketId]
      if (socketConn) {
        socketConn.join(room)
      }
    })
  }
}

export default new WebSockets()
