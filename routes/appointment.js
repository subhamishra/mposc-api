var express = require('express');
var router = express.Router();
const getEvents = require('../model/appointment.js').getEventByUserId;
const updateEvent = require('../model/appointment.js').updateEvent;
const addEvent = require('../model/appointment.js').addEvent;

router.get('/', async function (req, res, next) {
  const userId = req.query.userId;
  const type = req.query.type;
  const date = req.query.date;
  const data = await getEvents(userId, type, date);
  const events = data.result && data.result.length > 0 ? data.result[0] : {};
  if (data.isError) {
    res.send({
      isError: true,
      error: data.err
    });
  } else {
    res.send({
      isError: false,
      data: userProfile,
    });
  }
});

router.post('/create', async function (req, res, next) {
  const data = await addEvent(req);
  if (data.isError) {
    res.send({
      isError: true,
      error: data.err
    });
  }else {
    res.send({
      message: data.message,
    });
  }
});

router.post('/update', async function (req, res, next) {
  const data = await updateEvent(req);
  if (data.isError) {
    res.send({
      isError: true,
      error: data.err
    });
  }else {
    res.send({
      isError: false,
      message: "Appointment updated successfully" ,
    });
  }
});


module.exports = router;
