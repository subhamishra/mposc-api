var express = require('express');
var router = express.Router();
const lookuptype = require('../model/lookuptype.js')

router.get('/types', async function (req, res, next) {
  const data = await lookuptype.lookuptype('');
  const appUser = data.result && data.result.length > 0 ? data.result : {};
  if (!appUser) {
    res.send({
      isError: true,
      error: data.err
    });
  } else {
    res.send({
      data: appUser
    });
  }
});

router.get('/list/:typeId', async function (req, res, next) {
  const typeId = req.params.typeId;
  const data = await lookuptype.lookupTypeId(typeId, '');
  const appUser = data.result && data.result.length > 0 ? data.result : {};
  if (!appUser) {
    res.send({
      isError: true,
      error: data.err
    });
  } else {
    res.send({
      isError: false,
      data: appUser
    });
  }
});

module.exports = router;
