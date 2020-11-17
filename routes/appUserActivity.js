var express = require('express');
var router = express.Router();
const appUserActivity = require('../model/appUserActivity.js');

router.post('/', async function (req, res, next) {
  const data = await appUserActivity.addActivity(req.body);
  if (data.isError) {
    res.send({
      isError: true,
      error: data.err
    });
  }else {
    res.send(data);
  }
});

router.post('/redeemCart', async function (req, res, next) {
  const data = await appUserActivity.redeemCart(req.body);
  if (data.isError) {
    res.send({
      isError: true,
      error: data.err
    });
  }else {
    res.send(data);
  }
});

router.get('/reportByActivityType', async function (req, res, next) {
  const data = await appUserActivity.reportByActivityType(req.query.userId);
  if (data.isError) {
    res.send(data);
  }else {
    res.send(data);
  }
});

module.exports = router;
