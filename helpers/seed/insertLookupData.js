const filedata = require('./data/lookup')
const lookup = require('../../model/lookup');

async function insertLookUp() {
  filedata.forEach((item) => {
    insertLookupItems(item)
  })
}

async function insertLookupItems(item) {
  let lookupTypeName = item.lookupType.lookupType
  const {lookups, lookupType } = item
  //checking whether lookupType already exist in database
  const existResponse = await lookup.getLookupType(null, lookupTypeName || '');
  if (existResponse.isError || existResponse.result.length > 0) {
    console.log(`lookupType ${lookupTypeName} already exist or there is some error from mysql`);
    // const data = {
    //   isError: true,
    //   message: `lookupType ${type} already exist or there is some error from mysql`,
    //   error: lookupTypeRes.error,
    // }
  }

  let lookupTypeId;
//getting lookupId
  if (existResponse.result.length > 0) {
    console.log(`lookupType ${lookupTypeName} already exist`);
    lookupTypeId = existResponse.result[0].lookupTypeId;
  } else {
    const createdResponse = await lookup.addlookupType( lookupType);
    lookupTypeId = createdResponse.result.insertId;
  }

  if (!lookupTypeId) {
    console.error('lookupTypeId could not be found');
  } else {
    //adding lookup items to database
    lookups.map(async (data, index) => {
      console.log("inserting data index: ", index)
      const lookupResp = await lookup.addlookup({ ...data, lookupTypeId: lookupTypeId, });
      if (lookupResp.isError) {
        console.error(lookupResp.error);
      } else {
        console.log("Inserted data with id: ", lookupResp.result.insertId);
      }
    });
  }
}
module.exports = {
  insertLookUp:insertLookUp
}
