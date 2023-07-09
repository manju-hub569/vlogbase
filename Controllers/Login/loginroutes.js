const express = require('express');
const route = express.Router();
const login = require('./logincomponent');

route.post('/login',login.login);
route.get('/logout',login.logout)

module.exports = route;