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

function createVideo(values) {
  const SQL = `INSERT INTO videos
              ( 
                title,
                description,
                sourceUrl,
                thumbnailUrl,
                points
              ) values
              (?, ?, ?, ?, ?)`;
  const { title, description, sourceUrl, thumbnailUrl, points } = values;
  const updateValues = [title, description, sourceUrl, thumbnailUrl, points];
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
  // getVideoById: getVideoById,
  getVideos: getVideos,
  createVideo: createVideo,
}