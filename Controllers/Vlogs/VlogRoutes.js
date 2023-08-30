const express = require('express');
const route = express.Router();
const {vlogs, vlogsdata, getDataCount} = require('../Vlogs/VlogController');
const {Auth} = require('../../middleWare/auth');

route.post('/vlog_post', Auth, vlogs);
route.get('/vlog_data/:id',Auth, vlogsdata);
route.get('/vlog_count',Auth,getDataCount);

module.exports = route;