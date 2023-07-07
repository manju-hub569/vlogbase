const express = require('express');
const route = express.Router();
const multer = require('multer');
const {storage} = require('../../middleWare/multer');
const {upload} = require('./uploadfilecontroller');
  
  const uploadFile = multer({ storage: storage });

route.post('/upload',uploadFile.single('avatar'), upload);

module.exports = route;