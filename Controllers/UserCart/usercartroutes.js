const express = require('express');
const routes = express.Router();
const usercomponent = require('../UserCart/usercartcomponent');
const {Auth} = require('../../middleWare/auth')

routes.post('/addToCart', usercomponent.addCart);
routes.get('/cartCount/:userid',Auth, usercomponent.getCartCount);

module.exports = routes;