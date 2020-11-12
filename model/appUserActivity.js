const pool = require("../config/db.js");
const AppUser = require('./appUser');
const Lookup = require('./lookup');
const Video = require('./videos');
const Cart = require('./cart');

async function addActivity(details) {
  const { userId, scopeId, activityTypeId } = details;
  let totalpoints = 0;
  if (!userId || !scopeId || !activityTypeId) {
    return new Promise((resolve, reject) => {
      resolve({
        isError: false,
        message: "required fields userId, scopeId, activityTypeId",
      });
    });
  } else {
  //   const details = await elsePart(userId,activityTypeId,scopeId);
  //   return new Promise((resolve, reject) => {
  //     if(details.isError){
  //     resolve({
  //       isError: true,
  //       message: "cart points cannot exceed the total points",
  //     })
  //   }else{
  //       resolve({
  //         iserror:false,
  //         message:'cart redeemed successfull'
  //       })
  //   }
  // });
    const appUserResult = await AppUser.find("userId", userId);
    const activityLookup = await Lookup.getLookupById(activityTypeId);

    let appUser = appUserResult.result[0]
    let totalPoints = appUser.points;
    let pointsReceived = 0;
    let pointsRedeemed = 0;
    if (["VideoPointReceive", "QuizPointReceive"].includes(activityLookup.result[0].displayValue)) {
      const scopeData = await Video.getVideoById(scopeId);
      pointsReceived = scopeData.result[0].points;
      totalPoints += pointsReceived;
    } else {
     const caluculatedPoints = await getTotalCartPoints(userId);
       return new Promise((resolve, reject) => {
         if(caluculatedPoints.isError){
        resolve({
          isError: true,
          message: "cart points cannot exceed the total points",
        })
      }
       });
      pointsRedeemed = caluculatedPoints.pointsObj.pointsRedeemed;
      totalPoints = caluculatedPoints.pointsObj.totalPoints;
      // @todo implement for cart
    }

    const SQL = `INSERT INTO appuseractivity
                  SET
                  createdAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP,
                  createdByUserId = ${userId}, modifiedByUserId = ${userId}, appUserId = ${userId},
                  pointsRedeemed = ${pointsRedeemed}, pointsReceived = ${pointsReceived} , appuserBalancePoints = ${totalPoints},
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

async function getTotalCartPoints(userId) {
  const SQL = 'select c.cartId , c.userId, c.lookupId,c.quantity,l.points as lookupPoints, a.points as appuserPoints, ' +
      ' l.displayValue ' +
      ' from cart c ' +
      ' left join lookup l on c.lookupId = l.lookupId left join appuser a on c.userId = a.userId ' +
      ' where c.userId = ' + userId + ' and c.isWishList = 0';
  return new Promise((resolve, reject) => {
    pool.query(SQL, async (err, result) => {
      if (err) {
        console.log(err);
        resolve({
          isError: true,
          err: err,
        })
      } else {
        resolve({
                  isError: false,
                  message: "Succesfully fetched",
                  cartDetails: result
                })
//         var cartPoints = 0;
//         let pointsRedeemed=0;
//         let totalPoints=0;
//   result.forEach(res => {
//     cartPoints = (res.lookupPoints * res.quantity) + cartPoints;
// });
//   if(cartPoints < result[0].appuserPoints){
//     pointsRedeemed = cartPoints;
//     totalPoints = result[0].appuserPoints - cartPoints;
//     resolve({
//       isError: false,
//       message: "Succesfully fetched",
//       pointsObj: {pointsRedeemed, totalPoints}
//     })
//   }else{
//     resolve({
//       isError: true,
//       message: "Cart points are exceeding more than your total points"
//     })
//   }
}
});
});
}

async function redeemCart(details){
  const { userId, scopeId, activityTypeId } = details;
  const appUserResult = await AppUser.find("userId", userId);
  let appUser = appUserResult.result[0];
  let totalPoints = 0;
  let pointsRedeemed = 0;
  let pointsReceived = 0;
  if (!userId || !scopeId || !activityTypeId) {
    return new Promise((resolve, reject) => {
      resolve({
                isError: false,
                message: "required fields userId, scopeId, activityTypeId",
              });
  });
  } else {
    const cartItems = await getTotalCartPoints(userId);
    if(cartItems.isError){
      return new Promise((resolve, reject)=>{
        resolve({
            isError: true,
            message: cartItems.message
                })
      });
    }else{
      let cartPoints = 0;
      for(const cartItem of cartItems.cartDetails){
        cartPoints = (cartItem.lookupPoints * cartItem.quantity) + cartPoints;
        totalPoints = cartItem.appuserPoints - cartPoints;
                        if(cartPoints > cartItem.appuserPoints){
                          return new Promise(async (resolve, reject)=>{
                            resolve({
                                      isError: true,
                                      message: "exceeding your total points"
                                    })
                          });

                  }else{
                          pointsRedeemed = cartPoints;
                          const insertAppUserActivityDetails = await insertAppUserActivity(userId,pointsRedeemed,pointsReceived,totalPoints,cartItem.lookupId,scopeId,appUser);
                          return new Promise((resolve, reject)=>{
                          if(insertAppUserActivityDetails.isError){
                              resolve({
                                        isError:true,
                                        message:"Issue while inserting the useractivity"
                                      })
                          }else{
                            resolve({
                              isError:false,
                              message:"appuseractivity insterted successfully"
                            })
                          }
                        });
                  }

      }
      // appUser.points = totalPoints;
      // const updateUserPoints = await AppUser.updateAppUser(appUser);
      // return new Promise((resolve,reject)=>{
      //   if (updateUserPoints.isError) {
      //   resolve(updateUserPoints);
      // } else {
      //   resolve({
      //     isError: false,
      //     message: "AppUserActivity created successfully"
      //   })
      // }
      // })
    }
  }
}

async function insertAppUserActivity(userId,pointsRedeemed,pointsReceived,totalPoints,activityTypeId,scopeId,appUser){
      const SQL = `INSERT INTO appuseractivity
                                  SET
                                  createdAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP,
                                  createdByUserId = ${userId}, modifiedByUserId = ${userId}, appUserId = ${userId},
                                  pointsRedeemed = ${pointsRedeemed}, pointsReceived = ${pointsReceived} , appuserBalancePoints = ${totalPoints},
                                  activityTypeId = ${activityTypeId}, scopeId = ${scopeId} `;
      return new Promise((resolve, reject) => {
        pool.query(SQL,async ( err, result)=>{
          if(err){
            resolve({
              isError:true,
              message:err
            })
          }else{
            appUser.points = totalPoints;
            const updateUserPoints = await AppUser.updateAppUser(appUser);
            if(updateUserPoints.isError){
              resolve({
                isError:true,
                message:'data insterted successfully'
              })
            }else{
              resolve({
                isError:false,
                message:'data insterted successfully'
              })
            }
          }
        });
    });
    }


module.exports = {
  addActivity: addActivity,
  redeemCart: redeemCart,
}
