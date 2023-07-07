const express = require('express');
const route = express.Router();
const {login} = require('./logincomponent');

route.post('/login',login);

module.exports = route;