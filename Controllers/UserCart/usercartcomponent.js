// const CustCart = require('../../models/cart');
// const Category = require('../../models/category');

// module.exports.addCart = async (req, res) => {

//     try {

//     const data = await CustCart(req.body);

//     const resp = await data.save();

//     res.send( {
//         status : true ,
//         data : resp
//     })

//     } catch (error) {
//         console.log(error);
//         res.send({
//             status : false,
//             msg : error
//         })
//     }
// }

// module.exports.getCartCount = async (req, res) => {

//     const {userid} = req.params

//     try {
//         const data = await CustCart.find({userid}).lean();

//         res.send({
//             count : data.length
//         });

//     } catch (error) {
//         console.log(error);
//         res.send({
//             status : false,
//             msg : error
//         })        
//     }
// }

// ------------------------------------------------ suraj -----------------------------------------------

const express = require('express');
const { dbcoll } = require('../../DB/conn');
const { ObjectId } = require('mongodb');

const addToCart = async (req, res, next) => {
    console.log("addToCart", req.body);
    const newData = req.body;

    // newData = {
    //     userId: new ObjectId(req.body.userId),
    //     title:req.body.title,
    //     price:req.body.price,
    //     description:req.body.description,
    //     category:req.body.category,
    //     image:filename

    // }
    let filename;

    if (req.file) {
        filename = req.file.filename;
        newData.filename = filename;
    }

    try {

        const collection = await dbcoll('add-to-cart');
        const userCart = await collection.insertOne(newData);

        if (!userCart) {
            res.status(400).send({
                success: false,
                msg: 'Data Not Added'
            });
        } else {
            res.status(200).send({
                success: true,
                msg: "Data Added Successfully",
                data: userCart
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            msg: '',
            error: error.message
        });
    }
};

const getaddToCartData = async (req, res) => {
    console.log("getaddToCartData", req.query);
    let query = {}
    if (req.query.userId) {
        query.userId = new ObjectId(req.query.userId)

    }

    try {
        const collection = await dbcoll('add-to-cart')
        const getaddToCartData =await collection.aggregate([
            {
                $match:query
            }, {
                $lookup: {
                    from: "register",
                    localField: "userId",
                    foreignField: "_id",
                    as: "roleData"
                }
            },
        ]).toArray()
        res.status(200).send({
            success: true,
            msg: "Data Found Successfully",
            data: getaddToCartData
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            msg: "Data Not Found",
            error: error.message
        })

    }
}

module.exports = { addToCart, getaddToCartData };
