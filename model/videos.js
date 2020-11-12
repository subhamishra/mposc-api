const pool = require("../config/db.js");

function getVideos() {
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

async function getVideosByUserId(userId) {
  const videos = await getVideos();
  return new Promise((resolve, reject) => {
    if (videos.isError) {
      resolve(videos);
    } else {
      const statusPromises = videos.result.map((video) => {
        const SQL = `SELECT l.* FROM videos v
                    left join appuseractivity aua on aua.scopeId = v.videoId and appUserId = ${userId}
                    left join lookup l on l.lookupId = aua.activityTypeId
                    where v.videoId = ${video.videoId}
                    order by aua.updatedAt desc limit 1;
                    `;
        return new Promise((resolve1, reject) => {
          pool.query(SQL, [], (err, result) => {
            if (err) {
              console.log(err);
              resolve1({
                isError: true,
                err: err,
              })
            } else {
              video.status = result[0].displayValue;
              video.statusId = result[0].lookupId;
              resolve1({
                isError: false,
                result: result
              })
            }
          });
        });
      });
      Promise.all(statusPromises).then(() => {
        resolve(videos)
      });
    }
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
  getVideosByUserId: getVideosByUserId,
  getVideos: getVideos,
  createVideo: createVideo,
}