var express = require('express');
var router = express.Router();
const find = require('../model/appUser.js').find
const getProfile = require('../model/appUser.js').getProfile;
const updateProfile = require('../model/appUser.js').updateProfile;


router.post('/login', async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const data = await find('emailAddress', email);
  const appUser = data.result && data.result.length > 0 ? data.result[0] : {};
  if (data.isError) {
    res.send({
      isError: true,
      error: data.err
    });
  } else {
    if (appUser.password == password) {
      res.send({
        isError: false,
        userId: appUser.userId,
      });
    } else {
      res.send({
        isError: true,
        error: "Invalid Password"
      })
    }
  }
});

router.get('/profile', async function (req, res, next) {
  const userId = req.query.id;
  const data = await getProfile(userId);
  const appUser = data.result && data.result.length > 0 ? data.result[0] : {};
  if (data.isError) {
    res.send({
      isError: true,
      error: data.err
    });
  } else {
    res.send({
      isError: false,
      data: appUser,
    });
  }
});

router.post('/profile', async function (req, res, next) {
  // const userId = req.body;
  const data = await updateProfile(req.body);
  if (data.isError) {
    res.send(data);
  } else {
    res.send(data);
  }
});

module.exports = router;
