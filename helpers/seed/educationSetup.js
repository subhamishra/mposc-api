const educationData = require('./data/educationVideos');
const question = require('../../model/question');
const video = require('../../model/videos');

const lookup = require('../../model/lookup');

function educationSetup() {
    educationData.Data.forEach(async (data, index) => {
    console.log("inserting video with index: ", index);
    const videoInsertResp = await video.createVideo(data);
    if (videoInsertResp.isError){
      console.log(videoInsertResp);
    } else {
      console.log("inserting questions with index: ", index);
      data.children && await question.createBatch(data.children || [], videoInsertResp.result.insertId);
      console.log("inserted questions for index: ", index);
    }
  })
}

module.exports = {educationSetup:educationSetup};
