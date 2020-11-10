const pool = require("../config/db.js");

function getVideos () {
  const SQL = `SELECT * from videos`;
  return new Promise((resolve, reject) => {
    pool.query(SQL, [], (err, result) => {
      if (err) {
        console.log(err);
        resolve({
          isError: true,
          err: err,
        })
      } else {
        resolve({
          isError: false,
          result: result
        })
      }
    });
  })
}

function getVideoById(id) {
  const SQL = `SELECT * from videos where videoId = ${id}`;
  return new Promise((resolve, reject) => {
    pool.query(SQL, [], (err, result) => {
      if (err) {
        console.log(err);
        resolve({
          isError: true,
          err: err,
        })
      } else {
        resolve({
          isError: false,
          result: result
        })
      }
    });
  })
}

function createVideo(values) {
  const SQL = `INSERT INTO videos
              ( 
                title,
                description,
                sourceUrl,
                thumbnailUrl,
                points,
                quizPoints
              ) values
              (?, ?, ?, ?, ?, ?)`;
  const { title, description, sourceUrl, thumbnailUrl, points, quizPoints } = values;
  const updateValues = [title, description, sourceUrl, thumbnailUrl, points, quizPoints];
  return new Promise((resolve, reject) => {
    pool.query(SQL, updateValues, (err, result) => {
      if (err) {
        console.log(err);
        resolve({
          isError: true,
          err: err,
        })
      } else {
        resolve({
          isError: false,
          result: result
        })
      }
    });
  })
}

module.exports = {
  getVideoById: getVideoById,
  getVideos: getVideos,
  createVideo: createVideo,
}