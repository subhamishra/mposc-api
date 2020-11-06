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

function addEvent(values) {
  const { userId, startDate, lastDate } = values;
  const SQL = ``
  return new Promise((resolve, reject) => {
    pool.query(SQL, [startDate, lastDate, userId], (err, result) => {
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

function updateEvent(values) {
  const { userId, startDate, lastDate } = values;
  const SQL = ``;
  return new Promise((resolve, reject) => {
    pool.query(SQL, [startDate, lastDate, userId], (err, result) => {
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