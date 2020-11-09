var express = require('express');
var router = express.Router();
const lookup = require('../model/lookup.js')

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
  if (data.isError) {
    res.send(data);
  } else {
    res.send({
      isError: false,
      addedId: data.result.insertId,
      message: "successfully added lookup type"
    });
  }
});

router.post('/deleteType', async function (req, res, next) {
  const { lookupTypeId, lookupType } = req.body;
  const data = await lookup.deleteLookupType(lookupTypeId, lookupType);
  if (data.isError) {
    res.send(data);
  } else {
    res.send({
      isError: false,
      message: "successfully deleted lookup type"
    });
  }
});

module.exports = router;
