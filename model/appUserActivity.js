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
    }
    );
  } else {
    const details = await elsePart(userId,activityTypeId,scopeId);
    return new Promise((resolve, reject) => {
      if(details.isError){
      resolve({
        isError: true,
        message: "cart points cannot exceed the total points",
      })
    }else{
        resolve({
          iserror:false,
          message:'cart redeemed successfull'
        })
    }
  });


    // const appUserResult = await AppUser.find("userId", userId);
    // const activityLookup = await Lookup.getLookupById(activityTypeId);
    //
    // let appUser = appUserResult.result[0]
    // let totalPoints = appUser.points;
    // let pointsReceived = 0;
    // let pointsRedeemed = 0;
    // if (["VideoPointReceive", "QuizPointReceive"].includes(activityLookup.result[0].displayValue)) {
    //   const scopeData = await Video.getVideoById(scopeId);
    //   pointsReceived = scopeData.result[0].points;
    //   totalPoints += pointsReceived;
    // } else {
    //  const caluculatedPoints = await getTotalCartPoints(userId);
    //    return new Promise((resolve, reject) => {
    //      if(caluculatedPoints.isError){
    //     resolve({
    //       isError: true,
    //       message: "cart points cannot exceed the total points",
    //     })
    //   }
    //    });
    //   pointsRedeemed = caluculatedPoints.pointsObj.pointsRedeemed;
    //   totalPoints = caluculatedPoints.pointsObj.totalPoints;
    //   // @todo implement for cart
    // }
    //
    // const SQL = `INSERT INTO appuseractivity
    //               SET
    //               createdAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP,
    //               createdByUserId = ${userId}, modifiedByUserId = ${userId}, appUserId = ${userId},
    //               pointsRedeemed = ${pointsRedeemed}, pointsReceived = ${pointsReceived} , appuserBalancePoints = ${totalPoints},
    //               activityTypeId = ${activityTypeId}, scopeId = ${scopeId} `;
    // return new Promise((resolve, reject) => {
    //   pool.query(SQL, async (err, result) => {
    //     if (err) {
    //       console.log(err);
    //       resolve({
    //         isError: true,
    //         err: err,
    //       })
    //     } else {
    //       appUser.points = totalPoints;
    //       const updateUserPoints = await AppUser.updateAppUser(appUser);
    //       if (updateUserPoints.isError) {
    //         resolve(updateUserPoints);
    //       } else {
    //         resolve({
    //           isError: false,
    //           message: "AppUserActivity created successfully",
    //           insertedId: result.insertId,
    //         })
    //       }
    //     }
    //   });
    // });
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
//         var cartPoints = 0;
//         let pointsRedeemed=0;
//         let totalPoints=0;
//   result.forEach(res => {
//     cartPoints = (res.lookupPoints * res.quantity) + cartPoints;
// });
//   if(cartPoints < result[0].appuserPoints){
//     pointsRedeemed = cartPoints;
//     totalPoints = result[0].appuserPoints - cartPoints;
    resolve({
      isError: false,
      message: "Succesfully fetched",
      cartDetails: result
    })
  // }else{
  //   resolve({
  //     isError: true,
  //     message: "Cart points are exceeding more than your total points"
  //   })
  // }
}
});
});
}

async function elsePart(userId,activityTypeId,scopeId){
const cartItems = await getTotalCartPoints(userId);
  return new Promise(async (resolve, reject) => {
    if(cartItems.isError){
      resolve({
        isError:true,
        message:'cart value is more than the total points'
      })
  }else{
    const appUserResult = await AppUser.find("userId", userId);

    cartItems.cartDetails.forEach(async(cartItem,index) => {

      let appUser = appUserResult.result[0];
    let totalPoints = appUser.points;
    let pointsReceived = 0;
    let pointsRedeemed = 0;
    if (["VideoPointReceive", "QuizPointReceive"].includes(cartItem.displayValue)) {
      const scopeData = await Video.getVideoById(scopeId);
      pointsReceived = scopeData.result[0].points;
      totalPoints += pointsReceived;
    } else {
      var cartPoints = 0;
      // let pointsRedeemed=0;
      // let totalPoints=0;
      // result.forEach(res => {
      cartPoints = (cartItem.lookupPoints * cartItem.quantity) + cartPoints;
      // });
      return new Promise((resolve, reject) => {
        if(cartPoints < cartItem.appuserPoints) {
        pointsRedeemed = cartPoints;
        totalPoints = cartItem.appuserPoints - cartPoints;
      }else{
        resolve({
          isError:true,
          message:"your cart points are more than the total points"
        })
      }
    });
    }


    const SQL = `INSERT INTO appuseractivity 
                SET 
                createdAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP,
                createdByUserId = ${userId}, modifiedByUserId = ${userId}, appUserId = ${userId},
                pointsRedeemed = ${pointsRedeemed}, pointsReceived = ${pointsReceived} , appuserBalancePoints = ${totalPoints},
                activityTypeId = ${activityTypeId}, scopeId = ${scopeId},status = ${279} `;
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
  });
  }
  });
}

module.exports = {
  addActivity: addActivity,
}
