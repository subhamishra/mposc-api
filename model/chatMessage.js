const pool = require("../config/db.js");


function createPostInChatRoom(chatRoomId, message, postedByUser) {
  try {
    const SQL = `insert into chatmessages set chatRoomId = ?, message = ?, postedByUser = ?`;
    return new Promise((resolve, reject) => {
      pool.query(SQL, [chatRoomId, message, postedByUser], (err, result) => {
        if (err) {
          console.log(err);
          resolve({
            isError: true,
            error: err,
          })
        } else {
          resolve({
            isError: false,
            result: result
          })
        }
      });
    })
  } catch (error) {
    console.log('error on start chat method', error);
    throw error;
  }
}


async function getConversationByRoomId(chatRoomId, options = {}) {
  try {
    return this.aggregate([
      { $match: { chatRoomId } },
      { $sort: { createdAt: -1 } },
      // do a join on another table called users, and 
      // get me a user whose _id = postedByUser
      {
        $lookup: {
          from: 'users',
          localField: 'postedByUser',
          foreignField: '_id',
          as: 'postedByUser',
        }
      },
      { $unwind: "$postedByUser" },
      // apply pagination
      { $skip: options.page * options.limit },
      { $limit: options.limit },
      { $sort: { createdAt: 1 } },
    ]);
  } catch (error) {
    throw error;
  }
}

async function markMessageRead(chatRoomId, currentUserOnlineId) {
  try {
    const SQL = `UPDATE chatmessages SET readByUser = '${currentUserOnlineId}' WHERE chatRoomId = ${chatRoomId} AND postedByUser != ${currentUserOnlineId}`;
    return new Promise((resolve, reject) => {
      pool.query(SQL, (err, result) => {
        if (err) {
          console.log(err);
          resolve({
            isError: true,
            err: err,
          })
        } else {
          resolve({
            isError: false,
            message : "status updated successfully"
          })
        }
      });
    })
  } catch (error) {
    throw error;
  }
}


function getRecentConversation(chatRoomIds, options, currentUserOnlineId) {
  const SQL = `SELECT cr.userIds, cr.id, cm.message, cm.postedByUser, cm.readByUser, cm.createdAt, cm.updatedAt FROM chatrooms cr inner join chatmessages cm on cr.id = cm.chatroomId where cr.id in (${chatRoomIds})`;
  return new Promise((resolve, reject) => {
    pool.query(SQL, [], (err, result) => {
      if (err) {
        console.log(err);
        resolve({
          isError: true,
          error: err,
        })
      } else {
        resolve({
          isError: false,
          result: result
        })
      }
    });
  })
}

module.exports = {
  getRecentConversation: getRecentConversation,
  markMessageRead: markMessageRead,
  getConversationByRoomId: getConversationByRoomId,
  createPostInChatRoom: createPostInChatRoom,
}
