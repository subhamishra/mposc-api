const pool = require("../config/db.js");


async function getChatRoomsByUserId(userId) {

  const SQL = `SELECT * FROM chatrooms WHERE locate(${userId}, userIds)`;
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

async function getChatRoomByRoomId(roomId) {
  const SQL = `SELECT cm.chatRoomId, cm.message, cm.postedByUser, cm.readByUser, cr.userIds, cm.createdAt, cm.updatedAt FROM cms_dev_new.chatmessages cm inner join cms_dev_new.chatrooms cr on cm.chatRoomId = cr.id where cr.id = ${roomId} order by cm.createdAt desc`;
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

function checkAndGetRoom(userIds) {
  try {
    var reverse = userIds.split("").reverse().join("")
    const SQL = `SELECT * FROM chatrooms where userIds = "${userIds}" or userIds = "${reverse}"`;
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
  } catch (error) {
    console.log('error on start chat method', error);
    throw error;
  }
}

async function initiateChat(userIds) {
  try {
    const SQL = `insert into chatrooms set userIds = "${userIds}"`;
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
  } catch (error) {
    console.log('error on start chat method', error);
    throw error;
  }
}

module.exports = {
  checkAndGetRoom: checkAndGetRoom,
  initiateChat: initiateChat,
  getChatRoomByRoomId: getChatRoomByRoomId,
  getChatRoomsByUserId: getChatRoomsByUserId,
}
