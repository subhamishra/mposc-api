const express = require('express');
const router = express.Router();
const Question = require('../model/question.js');

router.get('/', async function (req, res) {
  const data = await Question.getQuestionsByVideoId(req.query.videoId);
  if (data.isError) {
    res.send(data);
  } else {
    res.send(data);
  }
});

module.exports = router;
