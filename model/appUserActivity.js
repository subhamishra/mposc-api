const pool = require("../config/db.js");
const AppUser = require('./appUser');
const Lookup = require('./lookup');
const Video = require('./videos');

async function addActivity(details) {
  const { userId, scopeId, activityTypeId } = details;
  let totalpoints = 0;
  if (!userId || !scopeId || !activityTypeId) {
    return new Promise((resolve, reject) => {
      resolve({
        isError: false,
        message: "required fields userId, scopeId, activityTypeId",
      });
    }
    );
  } else {
    const appUserResult = await AppUser.find("userId", userId);

    const activityLookup = await Lookup.getLookupById(activityTypeId)

    let appUser = appUserResult.result[0]
    let totalPoints = appUser.points;
    let pointsReceived = 0;
    let pointsRedeemed = 0;
    if (["VideoPointReceive", "QuizPointReceive"].includes(activityLookup.result[0].displayValue)) {
      const scopeData = await Video.getVideoById(scopeId);
      pointsReceived = scopeData.result[0].points;
      totalPoints += pointsReceived;
    } else {
      // @todo implement for cart
      // totalPoints -= scopeData.points;
    }

    const SQL = `INSERT INTO appuseractivity 
                  SET 
                  createdAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP,
                  createdByUserId = ${userId}, modifiedByUserId = ${userId}, appUserId = ${userId},
                  pointsRedeemed = ${pointsRedeemed}, pointsReceived = ${pointsReceived} , appuserBalancePoints = ${totalpoints},
                  activityTypeId = ${activityTypeId}, scopeId = ${scopeId} `;
    return new Promise((resolve, reject) => {
      pool.query(SQL, async (err, result) => {
        if (err) {
          console.log(err);
          resolve({
            isError: true,
            err: err,
          })
        } else {
          appUser.points = totalPoints;
          const updateUserPoints = await AppUser.updateAppUser(appUser);
          if (updateUserPoints.isError) {
            resolve(updateUserPoints);
          } else {
            resolve({
              isError: false,
              message: "AppUserActivity created successfully",
              insertedId: result.insertId,
            })
          }
        }
      });
    });
  }
}

module.exports = {
  addActivity: addActivity,
}
