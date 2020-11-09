const pool = require("../config/db.js");
const moment = require("moment")

async function getEvents(values) {
  const {userId, startDate, endDate} = values;
  const firstDate = moment(new Date(startDate)).valueOf();
  const lastDate = moment(new Date(endDate)).valueOf();
  const SQL = `SELECT * from caseappointment as ca
               LEFT JOIN appuser as au ON ca.caseId = au.caseId and au.userId = ?
               where ca.appointmentDateTime >= ? and ca.appointmentDateTime <= ?;`;
  const sres = await pool.query(SQL, [userId, firstDate, lastDate]);
  return new Promise((resolve, reject) => {
    pool.query(SQL, [Number(userId), firstDate, lastDate], (err, result) => {
      if (err) {
        console.log(err);
        resolve({
          isError: true,
          errpr: err,
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

async function addEvent(req) {
  const userId = req.body.userId ;
  const DateTime = req.body.appointmentDateTime;
  const appointmentDateTime = moment(new Date(DateTime)).valueOf();
  const appointmentTypeId = req.body.appointmentTypeId;
  if(!userId || isNaN(appointmentDateTime) || !appointmentTypeId){
    return new Promise((resolve, reject) => {
          resolve({
            isError: false,
            message: "Fill all details"
          })
        }
      );
    }else {
    const checkUser = await userConform(userId);
    function userConform(userId){
      const getCaseId_SQL = ` select count(*) as userconform, caseId from appuser where userId = ${userId}`;
      return new Promise((resolve, reject) => {
        pool.query(getCaseId_SQL,[userId], (err, result) => {
          if (err) {
            console.log(err);
            resolve({
              isError: true,
              error: err,
            })
          } else {
            resolve({
              result: result[0].userconform,
              caseId: result[0].caseId,
            })
          }
        });
      });
    }

    if(!checkUser.result){
      return new Promise((resolve, reject) => {
          resolve({
            isError: false,
            message: "UserId does not exsist"
          })
        }
      );
    }else {

      if(checkUser.caseId){
        const SQL = `INSERT INTO caseappointment SET createdAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP, createdByUserId = ${userId}, modifiedByUserId = ${userId}, caseId = ${checkUser.caseId}, appointmentDateTime = ${appointmentDateTime}, appointmentTypeId = ${appointmentTypeId}  `;
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
                message: "Appointment created successfully",
                insertedId: result.insertId,
              })
            }
          });
        });
      }else{
        return new Promise((resolve, reject) => {
          resolve({
            isError: false,
            message: "CaseId does not exsist for given userId"
          })
        });
      }
    }
  }
}

async function updateEvent(req) {
  const userId = req.body.userId;
  const DateTime = req.body.appointmentDateTime;
  const appointmentDateTime = moment(new Date(DateTime)).valueOf();
  const appointmentTypeId = req.body.appointmentTypeId;
  const appointmentId = req.body.appointmentId;
  if (!userId || isNaN(appointmentDateTime) || !appointmentTypeId || !appointmentId) {
    return new Promise((resolve, reject) => {
        resolve({
          isError: false,
          message: "Please enter valid input values, some values are null or appointmentDateTime is not in correct format"
        })
      }
    );
  } else {
    const checkUser = await userConform(userId);
    function userConform(userId){
      const getCaseId_SQL = ` select count(*) as userconform, caseId from appuser where userId = ${userId}`;
      return new Promise((resolve, reject) => {
        pool.query(getCaseId_SQL,[userId], (err, result) => {
          if (err) {
            console.log(err);
            resolve({
              isError: true,
              err: err,
            })
          } else {
            resolve({
              result: result[0].userconform,
              caseId: result[0].caseId,
            })
          }
        });
      });
    }

    if(!checkUser.result){
      return new Promise((resolve, reject) => {
          resolve({
            isError: false,
            message: "UserId does not exsist"
          })
        }
      );
    }else{

      if(checkUser.caseId){
        const SQL = `UPDATE caseappointment SET updatedAt = CURRENT_TIMESTAMP , modifiedByUserId = ${userId} , caseId = ${checkUser.caseId} ,appointmentDateTime = ${appointmentDateTime} , appointmentTypeId = ${appointmentTypeId} WHERE appointmentId = ${appointmentId}`;
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
                message: "Appointment updated successfully"
              })
            }
          });
        });
      }else{
        return new Promise((resolve, reject) => {
          resolve({
            isError: false,
            message: "CaseId does not exsist for given userId"
          })
        });
      }
    }
  }
}

module.exports = {
  getEventByUserId: getEvents,
  updateEvent: updateEvent,
  addEvent: addEvent,
}