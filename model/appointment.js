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
  // const DateTime = details.appointmentDateTime;
  const appointmentDateTime = details.appointmentDateTime;
  const appointmentTypeId = details.appointmentTypeId;
  // const DateTimeEnd = details.appointmentDateTimeEnd;
  const appointmentDateTimeEnd = details.appointmentDateTimeEnd;
  const statusId = details.statusId;
  const issue = details.issue;
  const notes = details.notes;
  const duration =    details.duration  ;
  if(!userId || !appointmentDateTime || !appointmentDateTimeEnd || !appointmentTypeId || !statusId || !duration){
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
        const SQL = `INSERT INTO caseappointment SET createdAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP,
         createdByUserId = ${userId},
          modifiedByUserId = ${userId},
           caseId = ${checkUser.caseId},
            appointmentDateTime = ${appointmentDateTime},
             appointmentDateTimeEnd = ${appointmentDateTimeEnd} ,
              appointmentTypeId = ${appointmentTypeId} ,
               statusId = ${statusId} ,
                issue = "${issue}" ,
                 notes = "${notes}" ,
                  duration = "${duration}"`;
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
  const AppointmentDetails = await getAppointmentDetails(details.appointmentId);
  function getAppointmentDetails(AppointmentId){
    const AppointmentDetailsSQL = `select * from caseappointment where appointmentId = ${AppointmentId}`;
    return new Promise((resolve, reject) => {
      pool.query(AppointmentDetailsSQL, (err, result) => {
        if (err) {
          console.log(err);
          resolve({
            isError: true,
            err: err,
          })
        } else {
          resolve({
                    result: result[0],
                  })
        }
      });
  });
  }
  const userId = details.userId ?  'modifiedByUserId = ' + details.userId + ' , ' : 'modifiedByUserId = ' + AppointmentDetails.result.modifiedByUserId  + ' , ';
  // const DateTime = details.appointmentDateTime;
  const appointmentDateTime =details.appointmentDateTime ? 'appointmentDateTime = ' + details.appointmentDateTime + ' , ' :'appointmentDateTime = ' + AppointmentDetails.result.appointmentDateTime+ ' , ';
  const appointmentTypeId = details.appointmentTypeId ? 'appointmentTypeId = ' + details.appointmentTypeId + ' , ' : 'appointmentTypeId = ' + AppointmentDetails.result.appointmentTypeId + ' , ';
  const appointmentId = details.appointmentId;
  const DateTimeEnd = details.appointmentDateTimeEnd;
  const appointmentDateTimeEnd = details.appointmentDateTimeEnd ? 'appointmentDateTimeEnd = ' + details.appointmentDateTimeEnd + ' , ' : 'appointmentDateTimeEnd = ' +AppointmentDetails.result.appointmentDateTimeEnd + ' , ';
  const statusId = details.statusId ? 'statusId = ' + details.statusId + ' , ' : 'statusId = ' + AppointmentDetails.result.statusId + ' , ';
  const issue = details.issue ? 'issue = "' + details.issue + '" , ' : 'issue = "' + AppointmentDetails.result.issue + '" , ';
  const notes = details.notes ? 'notes = "' + details.notes + '" , ' : 'notes = "' + AppointmentDetails.result.notes + '" , ';
  const duration = details.duration ? 'duration = "' + details.duration + '", ' : 'duration = "' + AppointmentDetails.result.duration + '", ';
  const whereParam = ' WHERE appointmentId = ';

    const checkUser = await userConform(details.userId);
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
        const SQL = 'UPDATE caseappointment SET updatedAt = CURRENT_TIMESTAMP , '+ userId +
          appointmentDateTime  +
          appointmentDateTimeEnd +
          appointmentTypeId +
          statusId  + issue +
          notes +
          duration + ' caseId = ' + checkUser.caseId + whereParam + appointmentId + ';';

          return new Promise((resolve, reject) => {
            pool.query(SQL, (err, result) => {
              if (err) {
                console.log(err);
                resolve({
                  isError: true,
                  err: err,
                })
              } else {
                if(result.affectedRows > 0){
          resolve({
            isError: false,
            message: "Appointment updated successfully"
          })
        }else{
          resolve({
            isError: false,
            message: "AppointmentId does not exists"
          })
        }

              }
            });
          });
      }else{
        return new Promise((resolve, reject) => {
          resolve({
            isError: false,
            message: "CaseId does not exists for userId"
          })
        });
      }
    }
  // }
}

module.exports = {
  getEventByUserId: getEvents,
  updateEvent: updateEvent,
  addEvent: addEvent,
}
