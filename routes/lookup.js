var express = require('express');
var router = express.Router();
const lookup = require('../model/lookup.js')
// const 

router.get('/types', async function (req, res, next) {
  const data = await lookup.lookuptype('');
  if (data.isError) {
    res.send(data);
  } else {
    res.send({
      isError: false,
      data: data.result
    });
  }
});

router.get('/list/:typeId', async function (req, res, next) {
  const typeId = req.params.typeId;
  const data = await lookup.lookupByTypeId(typeId, '');
  const appUser = data.result && data.result.length > 0 ? data.result : {};
  if (data.isError) {
    res.send(data);
  } else {
    res.send({
      isError: false,
      data: data.result
    });
  }
});

router.post('/addType', async function (req, res, next) {
  const data = await lookup.addlookupType(req.body);
  const appUser = data.result && data.result.length > 0 ? data.result : {};
  if (data.isError) {
    res.send(data);
  } else {
    res.send({
      isError: false,
      message: "successfully added lookup type"
    });
  }
});

module.exports = router;
