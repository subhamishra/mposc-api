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

async function addEvent(details) {
  const userId = details.userId ;
  const DateTime = details.appointmentDateTime;
  const appointmentDateTime = moment(new Date(DateTime)).valueOf();
  const appointmentTypeId = details.appointmentTypeId;
  const DateTimeEnd = details.appointmentDateTimeEnd;
  const appointmentDateTimeEnd = moment(new Date(DateTimeEnd)).valueOf();
  const statusId = details.statusId;
  const issue = details.issue;
  const notes = details.notes;
  const duration =    details.duration  ;
  if(!userId || !DateTime || !DateTimeEnd || !appointmentTypeId || !statusId || !duration){
    return new Promise((resolve, reject) => {
          resolve({
            isError: false,
            message: "Fill all details"
          });
        }
      );
    } else {
    const checkUser = await userConform(userId);
    if(!checkUser.result){
      return new Promise((resolve, reject) => {
          resolve({
            isError: false,
            message: "UserId does not exist",
          })
        }
      );
    }else {
      if(checkUser.caseId){
        const SQL = `INSERT INTO caseappointment SET createdAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP, createdByUserId = ${userId}, modifiedByUserId = ${userId}, caseId = ${checkUser.caseId}, appointmentDateTime = ${appointmentDateTime}, appointmentDateTimeEnd = ${appointmentDateTimeEnd} , appointmentTypeId = ${appointmentTypeId} , statusId = ${statusId} , issue = "${issue}" , notes = "${notes}" , duration = "${duration}"`;
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

async function updateEvent(details) {
  const userId = details.userId;
  const DateTime = details.appointmentDateTime;
  const appointmentDateTime = moment(new Date(DateTime)).valueOf();
  const appointmentTypeId = details.appointmentTypeId;
  const appointmentId = details.appointmentId;
  const DateTimeEnd = details.appointmentDateTimeEnd;
  const appointmentDateTimeEnd = moment(new Date(DateTimeEnd)).valueOf();
  const statusId = details.statusId;
  const issue = details.issue;
  const notes = details.notes;
  const duration = details.duration;
  if (!userId || !DateTime || !appointmentTypeId || !appointmentId || !DateTimeEnd || !statusId || !duration) {
    return new Promise((resolve, reject) => {
        resolve({
          isError: false,
          message: "Please enter valid input values, some values are null or appointmentDateTime is not in correct format"
        })
      }
    );
  } else {
    const checkUser = await userConform(userId);
    if(!checkUser.result){
      return new Promise((resolve, reject) => {
          resolve({
            isError: false,
            message: "UserId does not exsist"
          })
        }
      );
    }else{
      if(checkUser.caseId ){
        const checkAppointmentId = await appointmentIdConform(appointmentId);
        function appointmentIdConform(userId){
          const getCaseId_SQL = `select count(*) as checkAppointmentId from caseappointment where appointmentId = ${appointmentId}`;
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
                  result: result[0].checkAppointmentId,
                })
              }
            });
          });
        }

        if(checkAppointmentId.result){
          const SQL = `UPDATE caseappointment SET updatedAt = CURRENT_TIMESTAMP , modifiedByUserId = ${userId} , caseId = ${checkUser.caseId} ,appointmentDateTime = ${appointmentDateTime}  ,  appointmentDateTimeEnd = ${appointmentDateTimeEnd} , appointmentTypeId = ${appointmentTypeId} , statusId = ${statusId} , issue = "${issue}" , notes = "${notes}" , duration = "${duration}" WHERE appointmentId = ${appointmentId}`;
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
              message: "AppointmentId does not exists"
            })
          });
        }

      }else{
        return new Promise((resolve, reject) => {
          resolve({
            isError: false,
            message: "CaseId does not exists for userId"
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