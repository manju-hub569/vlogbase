const express = require('express');
const route = express.Router();
const Categ = require('./categorycomponent');
const {upload} = require('../../middleWare/multer');
const {Auth} = require('../../middleWare/auth');

route.post('/add_categ',upload.single('avatar'),Categ.addcategory);
route.get('/categ_data',Categ.getCateg);
route.get('/categAllProd' , Categ.allProducts);

module.exports = route;