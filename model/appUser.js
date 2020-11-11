const pool = require("../config/db.js");

async function login(emailAddress, password) {
  appUser = await find('emailAddress', emailAddress);
}

function addUser() {

}

function findUserById(id) {
  pool.query('select * from appuser where userId = ?', [id])
}

function find(column, value) {
  const SQL = `select * from appuser where ${column} = ?`;
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

function updateAppUser(values) {
  const { emailAddress, userId, points } = values;
  const SQL = `UPDATE appuser SET emailAddress = ?, points = ? where userId = ${userId}`;
  const updateValues = [emailAddress, points];
  return new Promise(async (resolve, reject) => {
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
          message: "updated successfully",
        })
      }
    });
  })
}

function getProfile(value) {
  const SQL = `SELECT * from casecontact INNER JOIN appuser  ON casecontact.caseId = appuser.caseId and appuser.userId = ?`;
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

function updateProfile(values) {
  const SQL = `UPDATE casecontact
              SET
                firstName = ?,
                lastName = ?,
                fullName = ?,
                birthdate = ?,
                streetAddress1 = ?,
                streetAddress2 = ?,
                city = ?,
                stateId = ?,
                zip = ?
                WHERE caseContactId = ?`;

  return new Promise(async (resolve, reject) => {
    const { userId, fullName, birthdate, streetAddress1, streetAddress2, city, stateId, zip, email } = values;
    const getContactRes = await getProfile(userId);
    if (getContactRes.isError) {
      resolve(getContactRes)
    } else {
      const updateValues = [null, null, fullName, birthdate, streetAddress1, streetAddress2, city || null, stateId || null, zip || null, getContactRes.result[0].caseContactId];
      const data1 = await pool.query(SQL, updateValues)
      const updateContact = new Promise((resolveContact, rejectContact) => {
        pool.query(SQL, updateValues, (err, result) => {
          if (err) {
            console.log(err);
            resolveContact({
              isError: true,
              err: err,
            })
          } else {
            resolveContact({
              isError: false,
              // result: result
            })
          }
        });
      });
      updateContact.then(async (value) => {
        if (value.isError) {
          resolve(value)
        } else {
          const appUserData = await updateAppUser(values);
          if (appUserData.isError) {
            resolve(appUserData);
          }
          resolve({
            isError: false,
            message: "updated successfully"
          })
        }
      });
    }
  });
}

module.exports = {
  login: login,
  addUser: addUser,
  findUserById: findUserById,
  find: find,
  getProfile: getProfile,
  updateProfile: updateProfile,
  updateAppUser: updateAppUser,
}