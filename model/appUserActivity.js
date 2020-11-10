const pool = require("../config/db.js");
const moment = require("moment")

async function addEvent(details) {
  const userId = details.userId ;
  const lookupId = details.lookupId;
  let totalpoints = 0 ;
  if(!userId || !lookupId){
    return new Promise((resolve, reject) => {
        resolve({
          isError: false,
          message: "Fill all details"
        });
      }
    );
  }else {
    const userPoints = await userpoints(userId)
    function userpoints(){
      const SQL = `select points from appuser where userId = ${userId}`;
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
              result: result[0].points
            })
          }
        });
      });
    }

    const lookupPoints = await lookuppoints(lookupId)
    function lookuppoints(){
      const SQL = `select points from lookup where lookupId = ${lookupId}`;
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
              result: result[0].points
            })
          }
        });
      });
    }

    totalpoints = userPoints.result + lookupPoints.result ;

    const SQL = `INSERT INTO appuseractivity SET createdAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP, createdByUserId = ${userId}, modifiedByUserId = ${userId}, appUserId = ${userId}, pointsRedeemed = 0 , pointsReceived = ${lookupPoints.result} , appuserBalancePoints = ${totalpoints} , lookupId = ${lookupId} `;
    return new Promise((resolve, reject) => {
      pool.query(SQL, (err, result) => {
        if (err) {
          console.log(err);
          resolve({
            isError: true,
            err: err,
          })
        } else {
          const SQL = `UPDATE appuser SET points = ${totalpoints} WHERE  userId = ${userId} `;
          pool.query(SQL, (err, res) => {
            if (err) {
              console.log(err);
              resolve({
                isError: true,
                err: err,
              })
            } else {
              resolve({
                isError: false,
                message: "AppUserActivity created successfully",
                insertedId: result.insertId,
              })
            }
          });
        }
      });
    });

  }

}

module.exports = {
  addEvent: addEvent,
}