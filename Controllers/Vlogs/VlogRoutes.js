const express = require('express');
const route = express.Router();
const {vlogs, vlogsdata} = require('../Vlogs/VlogController');
const {Auth} = require('../../middleWare/auth');

route.post('/vlog_post', Auth, vlogs);
route.get('/vlog_data:id',Auth, vlogsdata);

module.exports = route;