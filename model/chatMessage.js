const pool = require("../config/db.js");

function getMessageById(messageId) {
  const SQL = `SELECT cm.chatRoomId, cm.message, cm.postedByUser, cm.readByUser, cr.userIds, cm.createdAt, cm.updatedAt FROM chatmessages cm inner join chatrooms cr on cm.chatRoomId = cr.id where cm.id = ${messageId}`;
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

function createPostInChatRoom(chatRoomId, message, postedByUser,createdAt) {
  try {
    const SQL = `insert into chatmessages set chatRoomId = ?, message = ?, postedByUser = ?,createdAt = ?`;
    return new Promise((resolve, reject) => {
      pool.query(SQL, [chatRoomId, message, postedByUser, createdAt], (err, result) => {
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
            message: "status updated successfully"
          })
        }
      });
    })
  } catch (error) {
    throw error;
  }
}


function getRecentConversation(chatRoomIds, details, options, currentUserOnlineId) {
  // const SQL = `SELECT cr.userIds, cr.id, cm.message, cm.postedByUser, cm.readByUser, cm.createdAt, cm.updatedAt FROM chatrooms cr inner join chatmessages cm on cr.id = cm.chatroomId where cr.id in (${chatRoomIds}) ORDER BY cr.updatedAt DESC LIMIT 1`;
  const SQL = `select userIds, id,message,postedByUser,readByUser,max(createdAt) as createdAt,updatedAt
from (SELECT cr.userIds, cr.id, cm.message, cm.postedByUser, cm.readByUser, cm.createdAt, cm.updatedAt 
FROM chatrooms cr inner join chatmessages cm on cr.id = cm.chatroomId 
where cr.id in (${chatRoomIds})  ORDER BY cm.createdAt  DESC) as details group by id`;
  return new Promise((resolve, reject) => {
    pool.query(SQL, [], async (err, result) => {
      if (err) {
        console.log(err);
        resolve({
          isError: true,
          error: err,
        })
      } else {
        // result.
        const finalObject = [];
        var recentConversationDetails = JSON.parse(JSON.stringify(result));
        for(const [index,value] of recentConversationDetails.entries()){
              var appUserId = 0;
              var webUserId = 0;
              var usersIds = value.userIds.split(',');
              if (details.requestFrom == 'app') {
                appUserId = details.userId;
                usersIds.forEach(res => {
                  if (res != details.userId)
                    webUserId = res;
              })
              } else {
                webUserId = details.userId;
                usersIds.forEach(res => {
                  if (res != details.userId)
                    appUserId = res;
              })
              }
              const userSQL = `SELECT fullName FROM appuser where userId = ${appUserId} UNION
                                        SELECT fullName FROM user where userId = ${webUserId}`;
              var resultUser = await getUserDetails(userSQL,appUserId,webUserId,recentConversationDetails,index);
          if(result.isError){
            resolve({
              isError:true,
              message: 'error while fetching user details'
            })
          } else{finalObject.push(resultUser.result);}
        }
  if(finalObject.isError){
    resolve({
      isError:true,
      message: 'error while fetching user details'
    })
  }else{
    const newArr = recentConversationDetails.map((v, i) => {
      return  {...v, users: finalObject[i]}
    })
    resolve({
      isError:false,
      result: newArr
    })
  }
      }
    });
  })
}

async function getUserDetails(userSQL,appUserId,webUserId, recentConversationDetails,index){
  var recentConvoDetails = JSON.parse(JSON.stringify(recentConversationDetails));
  return new Promise((resolve, reject)=>{
    pool.query(userSQL, async (err, userNamesresult) => {
      if (err) {
        resolve({
          isError: true,
          err: err
        })
      } else {
        var userDetails = JSON.parse(JSON.stringify(userNamesresult));
        var users = [{ id: appUserId, name: userDetails[0].fullName },
          { id: webUserId, name: userDetails[1].fullName }];
        resolve({
          isError: false,
          result: users
        })
      }
    })
  });
}

module.exports = {
  getRecentConversation: getRecentConversation,
  markMessageRead: markMessageRead,
  createPostInChatRoom: createPostInChatRoom,
  getMessageById: getMessageById
}
