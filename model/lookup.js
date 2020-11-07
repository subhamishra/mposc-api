const pool = require("../config/db.js");

function lookuptype(value) {
  const SQL = `select lookupTypeId, lookupType from lookuptype`;
  return new Promise((resolve, reject) => {
    pool.query(SQL, [value], (err, result) => {
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

function lookupByTypeId(lookupTypeId, value) {
  const SQL = `select * from lookup where lookupTypeId = ${lookupTypeId}`;
  return new Promise((resolve, reject) => {
    pool.query(SQL, [value], (err, result) => {
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

function addlookupType(values) {
  const SQL = `INSERT INTO lookuptype
                (lookupType,scopeId,description)
               VALUES
                (?,?,?);`;
  const {lookupType, scopeId, description} = values;
  const updateValues = [lookupType, scopeId, description];
  return new Promise((resolve, reject) => {
    if (!lookupType) {
      resolve({
        isError: true,
        error: "please enter a valid lookuptype"
      })
    }
    pool.query(SQL, updateValues, (err, result) => {
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

module.exports = {
  lookuptype: lookuptype,
  lookupByTypeId: lookupByTypeId,
  addlookupType: addlookupType,
}
