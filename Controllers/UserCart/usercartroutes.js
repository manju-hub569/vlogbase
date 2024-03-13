const express = require('express');
const router = express.Router();
const usercomponent = require('../UserCart/usercartcomponent');
const { Auth } = require('../../middleWare/auth')
const upload = require('../../middleWare/multer')
const { convertStringToObjectIds, convertStringToNumber } = require('../../middleWare/convertToObjectId');

router.post('/addToCart', upload.single('addTOCart'), convertStringToObjectIds, convertStringToNumber, (req, res) => {
    usercomponent.addToCart(req, res)
});

router.get('/getaddToCartData', (req, res) => {
    usercomponent.getaddToCartData(req, res)
})

router.get('/getsingleORmultipleData', (req, res) => {
    usercomponent.getsingleORmultipleData(req, res)
})

router.put('/updateaddToCartData', convertStringToObjectIds, convertStringToNumber, (req, res) => {
    usercomponent.updateaddToCartData(req, res)
})

router.delete('/deleteaddToCartData/:id', (req, res) => {
    usercomponent.deleteaddToCartData(req, res)
})
module.exports = router;