const pool = require("../config/db.js");

function lookuptype(value) {
  const SQL = `select lookupTypeId, lookupType from lookuptype`;
  return new Promise((resolve, reject) => {
    pool.query(SQL, [value], (err, result) => {
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

function lookupTypeId(lookupTypeId, value) {
  const SQL = `select lookupId,lookupTypeId,displayValue,customStringValue,sortOrder from lookup where lookupTypeId = ${lookupTypeId}`;
  return new Promise((resolve, reject) => {
    pool.query(SQL, [value], (err, result) => {
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




module.exports = {
  lookuptype: lookuptype,
  lookupTypeId: lookupTypeId
}
