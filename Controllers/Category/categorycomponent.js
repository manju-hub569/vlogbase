// const category = require('../../models/category');

// module.exports.addcategory = async (req, res) => {

//     const {mainCateg, categName, categDiscript, price} = req.body;

//     try {
//         if(mainCateg == '' || categName == '' || categDiscript == '' || price == '') {
//             res.send({
//                 status : false,
//                 msg:"Please Fill All Details"
//             })
//         } else if (mainCateg && categName && categDiscript && price) {

//             let image = "";
//             if(req.file == undefined) {
//                 image = "default.png"
//             }else{
//                 image = req.file.filename
//             }

//             const save_data = await category({
//                 mainCateg,categName,categDiscript,price,img:image
//             });

//             const data_save = await save_data.save();

//             res.status(200).send({
//                 status: true,
//                 data: data_save
//             })

//         }
//     } catch (error) {
//         if(error) {
//             console.log(error)
//             res.send({
//                 status: false,
//                 msg: "duplicate key Found"
//             })
//         }        
//     }
// }

// module.exports.getCateg = async (req, res) => {
//     try {
//         const data = await category.find();
//         if(data) {
//             res.send({
//                 status : true,
//                 data
//             })
//         } else {
//             res.send({
//                 status : false,
//                 msg : "Not Found"
//             })
//         }
//     } catch (error) {
//         console.log(error);
//         res.send({
//             status : false,
//             msg : 'Not Found Data'
//         })
//     }
// }
// ------------------------------------------- suraj ---------------------------------------

const express = require('express');
const { dbcoll } = require('../../DB/conn');
const axios = require('axios');
const { ObjectId } = require('mongodb');

// const allProducts = async (req, res) => {
//     let responseData, data
//     try {
//         const response = await axios.get('https://fakestoreapi.com/products');
//         responseData = response.data;
//         console.log("responseData", responseData)
//         if (responseData) {
//             const collection = await dbcoll('product_category')
//             const data = await collection.insertMany(responseData)
//             if (data.length > 0) {
//                 const data1 = await collection.deleteMany({})
//                 if (data1.deletedCount > 0) {
//                     const insertMany = await collection.insertMany('responseData');
//                     res.status(200).send({
//                         success: true,
//                         msg: "Data Deleted and Added Successfully"
//                     })
//                 }else {
//                     // const insertMany = await collection.insertMany('responseData');
//                     res.status(400).send({
//                         success: false,
//                         msg: "Data Deleted and Added UnSuccessfully"
//                     })
//                 }
//             } 
//         } else {
//             res.status(400).res.send({
//                 status: false,
//                 error: error.message
//             });
//         }
//         res.send({
//             status: true,
//             data: responseData,
//             data
//         });
//     } catch (error) {
//         console.error(error);
//         res.send({
//             status: false,
//             msg: error.message,
//         });
//     }
// };

const allProducts = async (req, res) => {
    let responseData, data;
    try {
     
        const response = await axios.get('https://fakestoreapi.com/products');
        responseData = response.data;
        if (responseData && responseData.length > 0) {
            const collection = await dbcoll('product_category');
            const existingData = await collection.find({}).toArray();
            const newData = responseData.filter(item => !existingData.some(existingItem => existingItem.id === item.id)) ;
            if (newData.length > 0) {
                const insertResult = await collection.insertMany(newData);
                if (insertResult.insertedCount > 0) {
                    res.status(200).send({
                        success: true,
                        msg: "New data added successfully"
                    });
                } else {
                    res.status(400).send({
                        success: true,
                        msg: " No New data added "
                    });
                }
            } else {
                res.status(400).send({
                    success: false,
                    msg: "No new data to add"
                });
            }
        } else {
            res.status(400).send({
                success: false,
                msg: "No data received from the external API"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            msg: error.message
        });
    }
};



const singleCategory = async (req, res) => {
    const { category } = req.params
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        const responseData = response.data;

        res.send({
            status: true,
            data: responseData,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: true,
            data: error
        })
    }
}

const addCategory = async (req, res) => {
    console.log("addCategory", req.body)
    const newData = req.body;
    let filename
    if (req.file) {
        filename = req.file.filename
        newData.filename = filename

    }
    try {
        const collection = await dbcoll('product_category');
        const data = await collection.insertOne(newData);
        if (!data) {
            res.status(400).send({
                success: false,
                msg: "Data Not Added",
                error: error.message
            })

        } else {
            res.status(200).send({
                success: true,
                msg: "Data Added Successfully",
                data: data
            })
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            msg: "Internal Server Error",
            error: error.message
        })

    }

}

const getAllProducts = async (req, res) => {
    console.log('getAllProducts')
    try {
        const collection = await dbcoll('product_category')
        const getAllProducts = await collection.find().toArray()
        if (!getAllProducts) {
            res.status(400).send({
                success: false,
                msg: "Data Not Found",
                error: error.message
            })
        } else {
            res.status(200).send({
                success: true,
                msg: "Data Found Successfully",
                data: getAllProducts
            })
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            msg: "Internal Server Error",
            error: error.message
        })
    }

}

const getProdByCategory = async (req, res) => {
    console.log("getProdByCategory", req.params);
    const category_data = req.params
    try {
        const collection = await dbcoll('product_category')
        const getProdByCategory = await collection.find(category_data).toArray()
        if (!getProdByCategory) {
            res.status(400).send({
                success: false,
                msg: "Data Not Found",
                error: error.message
            })
        } else {
            res.status(200).send({
                success: false,
                msg: "Data Found Successfully",
                data: getProdByCategory
            })
        }

    } catch (error) {
        res.status(400).send({
            success: false,
            msg: "Internal Server Error",
            error: error.message
        })
    }

}

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id
        const collection = await dbcoll('product_category');
        const getCategoryById = await collection.findOne({});
        if (!getCategoryById) {
            res.status(400).send({
                success: false,
                msg: "No Data Found",
                error: error.message
            })
        } else {
            res.status(200).send({
                success: true,
                msg: "Category Data",
                data: getCategoryById
            })

        }
    } catch (error) {
        res.status(400).send({
            success: false,
            msg: "Internal Server Error",
            error: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    console.log('updateProduct', req.body)

    try {
        const id = req.params.id;
        const updateData = { $set: { ...req.body } }
        const collection = await dbcoll('product_category')
        const updateProduct = await collection.updateOne({ _id: new ObjectId(id) }, updateData);
        console.log('updateProduct')
        if (!updateProduct) {
            res.status(400).send({
                success: false,
                msg: "Data Not Updated",
                error: error.message
            })
        } else {
            res.status(200).send({
                success: true,
                msg: "Data Updated Successfully",
                data: updateProduct
            })

        }

    } catch (error) {
        res.status(400).send({
            success: false,
            msg: "Data Not Updated",
            error: error.message
        })

    }
}


module.exports = { addCategory, getAllProducts, getProdByCategory, getCategoryById, updateProduct, allProducts, singleCategory } 