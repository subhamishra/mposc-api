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

function lookupTypeId(lookupTypeId,value) {
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
    lookupTypeId:lookupTypeId
}











//RUF__________
//m//
// // lookuptype = function (req ,res) {
// //     pool.query("Select * from lookuptype", function (err, data) {
// //         if(err) {
// //             res(err);
// //         }
// //         else{
// //             res(null, data);
// //         }
// //     });
// //
// // user.findById = function (id, result) {
// //     dbConn.query("Select * from user where user_id = ? ", id, function (err, res) {
// //         if(err) {
// //             console.log("error: ", err);
// //             result(err, null);
// //         }
// //         else{
// //             result(null, res);
// //         }
// //     });
// // };// };odule.exports= lookuptype;