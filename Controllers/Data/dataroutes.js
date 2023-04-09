const express = require('express');
const route = express.Router();
const {Data} = require('./datacontroller');

route.get('/getdata',Data);

module.exports = route;