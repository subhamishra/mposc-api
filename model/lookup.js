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
  });
}

function getLookupType(id, lookupType) {
  const WHERE_CLAUSE = !!id ? `lookupTypeId = ${id}` : `lookupType = '${lookupType}'`
  // lookupType ? "lookupType = " + "'" + lookupType + "'" : "";
  const SQL = `SELECT * FROM lookuptype WHERE ${WHERE_CLAUSE}`;
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

function lookupByTypeId(lookupTypeId, value) {
  const SQL = `SELECT * FROM lookup WHERE lookupTypeId = ${lookupTypeId}`;
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
  const { lookupType, scopeId, description } = values;
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
          result: result,
        })
      }
    });
  })
}

function deleteLookupType(id, lookupType) {
  const WHERE_CLAUSE = !!id ? `lookupTypeId = ${id}` : `lookupType = ${lookupType || ""}`
  const SQL = `DELETE FROM lookuptype
               WHERE ${WHERE_CLAUSE};
              `;
  return new Promise((resolve, reject) => {
    pool.query(SQL, [], (err, result) => {
      if (err) {
        console.log(err);
        resolve({
          isError: true,
          error: err,
        });
      } else {
        if (result.affectedRows <= 0) {
          resolve({
            isError: true,
            message: "Could not find the lookuptype with id: " + id,
          })
        } else {
          resolve({
            isError: false,
            result: result
          });
        }
      }
    });
  });
}

function addlookup(values) {
  const SQL = `INSERT INTO lookup
                (
                  lookupTypeId,
                  displayValue,
                  customValue,
                  customStringValue,
                  sortOrder,
                  scopeId,
                  points
                )
               VALUES (?,?,?,?,?,?,?)`;
  const { lookupTypeId, displayValue, customValue, customStringValue, sortOrder, scopeId, points } = values;
  const updateValues = [lookupTypeId, displayValue, customValue, JSON.stringify(customStringValue), sortOrder, scopeId, points];
  return new Promise((resolve, reject) => {
    if (!lookupTypeId) {
      console.error("please enter a valid lookupTypeId");
      resolve({
        isError: true,
        error: "please enter a valid lookupTypeId",
      })
    } else if (!displayValue) {
      console.error("Please enter a valid display value");
      resolve({
        isError: true,
        error: "Please enter a valid display value",
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
          result: result,
        })
      }
    });
  })
}

function getLookupById(lookupId) {
  const SQL = `select * from lookup where lookupId = ${lookupId}`;
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
          result: result,
        })
      }
    });
  });
}

// {
//   displayValue: "Stroller",
//     customValue: null,
//   customStringValue: {
//   "ImagePath": "Stroller.png",
//     "Description": "Test",
// },
//   points: "1500",
// }

function createloockup(values) {
  const SQL = `INSERT INTO lookup
              ( displayValue,
                customValue,
                customStringValue,
                points
              ) values
              (?, ?, ?, ?)`;
  const { displayValue, customValue, customStringValue, points } = values;
  const updateValues = [displayValue, customValue, customStringValue, points];
  return new Promise((resolve, reject) => {
    pool.query(SQL, updateValues, (err, result) => {
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
  lookupByTypeId: lookupByTypeId,
  getLookupById: getLookupById,
  getLookupType: getLookupType,
  addlookupType: addlookupType,
  deleteLookupType: deleteLookupType,
  addlookup: addlookup,
  createloockup:createloockup
}
