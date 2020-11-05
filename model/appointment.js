const pool = require("../config/db.js");

function getEvents(userId, type, date) {
  let selectedDate = newDate(date)
  let firstDate = null;
  let lastDate = null;
  switch (type) {
    case 'monthly':
      firstDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      lastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
      break;
    case 'weekly':
      firstDate = new Date(selectedDate.getFullYear(), selectedDate.getWeek(), 1);
      lastDate = new Date(selectedDate.getFullYear(), selectedDate.getWeek() + 1, 0);
      break;
    case 'daily':
      firstDate = selectedDate;
      lastDate = selectedDate;
      break;
  }
  const SQL = `SELECT * from caseappointment
               LEFT JOIN appuser ON caseappointment.caseId = appuser.caseId and appuser.userId = ?
               WHERE 
                caseappointment.appointmentDateTime BETWEEN ? AND ? `;
  return new Promise((resolve, reject) => {
    pool.query(SQL, [firstDate, lastDate, userId], (err, result) => {
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