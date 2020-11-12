const pool = require("../config/db.js");

async function addcart (details) {
  const {userId, lookupId, iswishlist,quantity,status} = details;

    const doesExist = await checkDoesExist(userId,lookupId);
    function checkDoesExist(userId,lookupId){
      const SQL = `select * from cart where userId = ${userId} AND lookupId = ${lookupId} AND iswishlist = ${iswishlist}`;
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
      })
    }
     if(doesExist.result.length){
       const SQL = `UPDATE cart set quantity = ${quantity} where userId = ${userId} and lookupId = ${lookupId} and iswishlist = ${iswishlist}`;
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
               message : "item added to cart successfully"
             })
           }
         });
       })
     }else {
       const SQL = `insert into cart set userId = ${userId}, lookupId = ${lookupId}, iswishlist = ${iswishlist} ,quantity = ${quantity},status=${status}`;
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
               insertId: result.insertId,
               message : "item added to cart successfully"
             })
           }
         });
       })
     }

}

function getcart (details) {
  const {userId, iswishlist} = details;
  const SQL = `select * from cart where userId = ${userId} and iswishlist = ${iswishlist}`;
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
  })
}


async function updatecart (details) {
  const {cartId, lookupId, quantity} = details;
  const status = await getStatus(lookupId);
  function getStatus(lookupId){
    const SQL = `select customStringValue from lookup where lookupId = ${lookupId}`;
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
    })
  }
  // if(status && status.result && status.result[0].customStringValue){
    const SQL = `UPDATE cart SET quantity = '${quantity}' WHERE cartId = ${cartId}`;
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
            message : "status updated successfully"
          })
        }
      });
    })
  // }
}

module.exports = {
  addcart: addcart,
  getcart:getcart,
  updatecart:updatecart
}