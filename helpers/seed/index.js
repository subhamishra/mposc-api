// const addEducationData = require('./education')
const SeedData = require('./data/index');
const lookup = require('../../model/lookup');

async function insetLookUp(dataToInsert = [], type) {
  // insert MicrolearningEducationVideo LookupType
  const lookupType = await lookup.getLookupType(null, type || '');
  if (lookupType.isError || lookupType.result.length > 0) {
    const data = {
      isError: true,
      message: `lookupType ${type} already exist or there is some error from mysql`,
      error: lookupType.error,
    }
  }

  let lookupTypeId;
    
  if (lookupType.result.length > 0) {
    console.log(`lookupType ${type} already exist`);
    lookupTypeId = lookupType.result[0].lookupTypeId;
  } else {
    const lookupTypeResponse = await lookup.addlookupType({
      lookupType: 'MicrolearningEducationVideo',
      description: "Videos for microlearning education provided in Education screen in mobile app",
    });
    lookupTypeId = lookupTypeResponse.insertId;
  }

  if (!lookupTypeId) {
    console.error('lookupTypeId could not be found');
  } else {
    // insert MicrolearningEducationVideos in lookup table
    dataToInsert.map(async (video, index) => {
      console.log("inserting video index: ", index)
      const lookupResp = await lookup.addlookup({ ...video, lookupTypeId: lookupTypeId, });
      if (lookupResp.isError) {
        console.error(lookupResp.error);
      } else {
        console.log("Inserted video with id: ", lookupResp.result.insertId);
        if(video.children) {
          const {childData, childLookup} = video.children;
          if (childLookup && childData) {
            insetLookUp(childData, childLookup)
          }
        }
      }
    });
  }
}

SeedData.forEach((data) => {
  insetLookUp(data.Data, data.LookupType);
})
