const express = require('express');
const route = express.Router();
const Data = require('./RegisterControle');
const {upload} = require('../../middleWare/multer');
const {Auth} = require('../../middleWare/auth');

route.post('/data',upload.single('avatar'),Data.postData);
route.get('/getdata',Auth,Data.getData);
route.get('/getCount',Data.getDataCount)

module.exports = route;