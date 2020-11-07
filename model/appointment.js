const pool = require("../config/db.js");
const moment = require("moment")

async function getEvents(values) {
  const {userId, startDate, endDate} = values;
  const firstDate = moment(new Date(startDate)).valueOf();
  const lastDate = moment(new Date(endDate)).valueOf();;
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
  const appointmentDateTime = req.body.appointmentDateTime;
  const appointmentTypeId = req.body.appointmentTypeId;
  const caseId = await getcaseId(userId);

   function getcaseId(userId){
    const getCaseId_SQL = `select caseId from appuser where userId = ?`;
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
             isError: false,
             result: result[0].caseId
           })
         }
       });
     });
    }

    if(caseId.result){
      const SQL = `INSERT INTO caseappointment SET createdAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP, createdByUserId = ${userId}, modifiedByUserId = ${userId}, caseId = ${caseId.result}, appointmentDateTime = ${appointmentDateTime}, appointmentTypeId = ${appointmentTypeId}  `;
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
              message: "Appointment created successfully"
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

function updateEvent(req) {
  const userId = req.body.userId ;
  const appointmentDateTime = req.body.appointmentDateTime ;
  const appointmentTypeId = req.body.appointmentTypeId ;
  const appointmentId = req.body.appointmentId ;
  const SQL = `UPDATE caseappointment SET updatedAt = CURRENT_TIMESTAMP , modifiedByUserId = ${userId} ,appointmentDateTime = ${appointmentDateTime} , appointmentTypeId = ${appointmentTypeId} WHERE appointmentId = ${appointmentId}`;
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
          result: result
        })
      }
    });
  });
}

module.exports = {
  getEventByUserId: getEvents,
  updateEvent: updateEvent,
  addEvent: addEvent,
}