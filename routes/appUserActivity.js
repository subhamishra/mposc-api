var express = require('express');
var router = express.Router();
const addEvent = require('../model/appUserActivity.js').addEvent;

router.post('/', async function (req, res, next) {
  const data = await addEvent(req.body);
  if (data.isError) {
    res.send({
      isError: true,
      error: data.err
    });
  }else {
    res.send(data);
  }
});

module.exports = router;