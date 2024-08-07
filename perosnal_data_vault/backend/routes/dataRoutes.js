const express = require('express');
const router = express.Router();
const Data = require('../models/Data');
const User = require('../models/User');

router.get('/', async (req, res) => {
  const userId = req.user._id;
  const data = await Data.find({ user: userId });
  res.send(data);
});

router.post('/', async (req, res) => {
  const userId = req.user._id;
  const { type, data } = req.body;
  const newData = new Data({ user: userId, type, data });
  await newData.save();
  res.send({ message: 'Data created successfully' });
});

module.exports = router;