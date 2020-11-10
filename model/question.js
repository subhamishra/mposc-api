const pool = require("../config/db.js");

function getQuestionsByVideoId(videoId) {
  const SQL = `SELECT * from quizquestions where videoId = ?`;
  return new Promise((resolve, reject) => {
    pool.query(SQL, [videoId], (err, result) => {
      if (err) {
        console.log(err);
        resolve({
          isError: true,
          err: err,
        });
      } else {
        resolve({
          isError: false,
          result: result
        });
      }
    });
  });
}

function insertQuestion(values) {
  const SQL = `INSERT INTO quizquestions
              (
                videoId,
                question,
                options,
                correctAnswerIndex
              )
              VALUES
              (?,?,?,?)`;
  
  const { question, options, correctAnswerIndex, videoId } = row;
  const insertValues = [videoId, question, options, correctAnswerIndex];

  return new Promise((resolve, reject) => {
    pool.query(SQL, insertValues, (err, result) => {
      if (err) {
        console.log(err);
        resolve({
          isError: true,
          err: err,
        });
      } else {
        resolve({
          isError: false,
          result: result
        });
      }
    });
  });
}

async function createBatch(rows, videoId) {
  let SQL = `INSERT INTO quizquestions
              (
                videoId,
                question,
                options,
                correctAnswerIndex
              )
              VALUES
              `
  let values = [];
  rows.forEach((row, index) => {
    const { question, options, correctAnswerIndex } = row;
    values = [...values, videoId, question, JSON.stringify(options), correctAnswerIndex];
    SQL = SQL + '(?,?,?,?)';
    if (rows.length - 1 !== index ) {
      SQL = SQL + ',';
    }
  });

  return new Promise((resolve, reject) => {
    pool.query(SQL, values, (err, result) => {
      if (err) {
        console.log(err);
        resolve({
          isError: true,
          err: err,
        });
      } else {
        resolve({
          isError: false,
          result: result
        });
      }
    });
  });
}

module.exports = {
  createBatch: createBatch,
  getQuestionsByVideoId: getQuestionsByVideoId,
}