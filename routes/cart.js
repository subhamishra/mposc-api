const express = require('express');
const router = express.Router();
const cart = require('../model/cart.js');

router.post('/addcart', async function (req, res) {
  const data = await cart.addcart(req.body);
  if (data.isError) {
    res.send(data);
  } else {
    res.send(data);
  }
})

router.get('/getcart', async function (req, res) {
  const data = await cart.getcart(req.query);
  if (data.isError) {
    res.send(data);
  } else {
    res.send(data);
  }
})

router.post('/updatecart', async function (req, res) {
  const data = await cart.updatecart(req.body);
  if (data.isError) {
    res.send(data);
  } else {
    res.send(data);
  }
})

module.exports = router;
