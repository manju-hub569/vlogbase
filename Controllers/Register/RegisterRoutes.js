const express = require('express');
const route = express.Router();
const {postData} = require('./RegisterControle');

route.post('/data',postData);

module.exports = route;