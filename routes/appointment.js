var express = require('express');
var router = express.Router();
const getEvents = require('../model/appointment.js').getEventByUserId;
const updateEvent = require('../model/appointment.js').updateEvent;
const addEvent = require('../model/appointment.js').addEvent;

router.get('/', async function (req, res, next) {
  const data = await getEvents(req.query);
  if (data.isError) {
    res.send(data);
  } else {
    res.send({
      isError: false,
      data: data.result,
    });
  }
});

router.post('/create', async function (req, res, next) {
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

router.post('/update', async function (req, res, next) {
  const data = await updateEvent(req.body);
  if (data.isError) {
    res.send({
      isError: true,
      error: data.err
    });
  }else {
    res.send({
      message: data.message ,
    });
  }
});

module.exports = router;
