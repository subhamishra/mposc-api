const express = require('express');
const router = express.Router();
const Video = require('../model/videos.js');

router.get('/', async function (req, res) {
  const data = await Video.getVideosByUserId(req.query.userId);
  if (data.isError) {
    res.send(data);
  } else {
    res.send(data);
  }
})

module.exports = router;
