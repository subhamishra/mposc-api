var express = require('express');
var router = express.Router();
const lookuptype = require('../model/lookuptype.js')


router.get('/list', async function (req, res, next) {
    const data = await lookuptype.lookuptype('');
    const appUser = data.result && data.result.length > 0 ? data.result : {};
    if (!appUser) {
        res.send({
            isError: true,
            error: data.err
        });
    } else {
       res.send({
           data: appUser
       });
    }
});

router.get('/list/:id', async function (req, res, next) {
    const Id = req.params.id;
    const data = await lookuptype.lookupTypeId(Id,'');
    const appUser = data.result && data.result.length > 0 ? data.result : {};
    if (!appUser) {
        res.send({
            isError: true,
            error: data.err
        });
    } else {
        res.send({
            data: appUser
        });
    }
});

module.exports = router;




//RUF__________________

//
// router.get('/', lookuptype);
//
// function lookuptype(column, value) {
//     const SQL = `select * from lookuptype`;
//     return new Promise((resolve, reject) => {
//         pool.query(SQL, [value], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 resolve({
//                     isError: true,
//                     err: err,
//                 })
//             } else {
//                 resolve({
//                     isError: false,
//                     result: result
//                 })
//             }
//         });
//     })
// }
//
// /* GET home page. */
// router.get('/lookuptype', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });