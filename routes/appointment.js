var express = require('express');
var router = express.Router();
const getEvents = require('../model/appointment.js').getEventByUserId;

router.get('/', async function (req, res, next) {
  const data = await getEvents(req.query);
  const events = data.result && data.result.length > 0 ? data.result[0] : {};
  if (data.isError) {
    res.send(data);
  } else {
    res.send({
      isError: false,
      data: events,
    });
  }
});

module.exports = router;
