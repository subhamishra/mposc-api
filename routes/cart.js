const express = require('express');
const router = express.Router();
const cart = require('../model/cart.js');

router.post('/add', async function (req, res) {
  const data = await cart.addcart(req.body);
  if (data.isError) {
    res.send(data);
  } else {
    res.send(data);
  }
})

router.get('/', async function (req, res) {
  const data = await cart.getcart(req.query);
  if (data.isError) {
    res.send(data);
  } else {
    res.send(data);
  }
})

router.post('/update', async function (req, res) {
  const data = await cart.updatecart(req.body);
  if (data.isError) {
    res.send(data);
  } else {
    res.send(data);
  }
})

module.exports = router;
