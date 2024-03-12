const express = require('express');
const router = express.Router();
const usercomponent = require('../UserCart/usercartcomponent');
const {Auth} = require('../../middleWare/auth')
const upload = require('../../middleWare/multer')
const { convertStringToObjectIds , convertStringToNumber } = require('../../middleWare/convertToObjectId');

router.post('/addToCart',upload.single('addTOCart'), convertStringToObjectIds ,convertStringToNumber, (req,res)=>{
    usercomponent.addToCart(req,res)
});

router.get('/getaddToCartData',(req,res)=>{
    usercomponent.getaddToCartData(req,res)
})
module.exports = router;