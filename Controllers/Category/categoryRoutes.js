const express = require('express');
const router = express.Router();
const categorycomponent = require('./categorycomponent');
const upload = require('../../middleWare/multer');
const { Auth } = require('../../middleWare/auth');
const { convertStringToObjectIds, convertStringToNumber } = require('../../middleWare/convertToObjectId');

router.post('/addCategory', upload.single('selectCategory'), convertStringToNumber, convertStringToObjectIds, (req, res) => {
    categorycomponent.addCategory(req, res)
});

router.get('/getAllProducts', (req, res) => {
    categorycomponent.getAllProducts(req, res)
})

router.get('/getProdByCategory/:category', (req, res) => {
    categorycomponent.getProdByCategory(req, res)
})

router.get('/getCategoryById', (req, res) => {
    categorycomponent.getCategoryById(req, res)
})

router.put('/updateProduct/:id',async(req,res)=>{
    categorycomponent.updateProduct(req,res)
})

router.get('/categSingleCateg/:category',async(req,res)=>{
    categorycomponent.singleCategory(req,res)
})

router.post('/categAllProd',async(req,res)=>{
    categorycomponent.allProducts(req,res)
})

module.exports = router;