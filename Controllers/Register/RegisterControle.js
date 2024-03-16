// const Register = require('../../models/register');
// const bcrypt = require('bcrypt');

// module.exports.postData = async (req, res) => {

//     const {username, password, email, mobile, address} = req.body;

//     try {

//         if(username == '' || password == '' || email == '' || mobile == '' || address == '') {
//             res.send({
//                 data:"Signup Failed"
//             })
//         } else {

//             let pass = await bcrypt.hash(password, 10);

//             let image = "";
//             if(req.file == undefined) {
//                 image = "default.png"
//             }else{
//                 image = req.file.filename
//             }

//             const save_data = await Register({
//                 username,password:pass,email,address,mobile,img:image
//             });

//             const data_save = await save_data.save();

//             res.status(200).send({
//                 status: true,
//                 resp: data_save,
//                 data : "Register Successfull"
//             })

//         }

//     } catch (error) {
//         if(error) {
//             console.log(error)
//             res.send({
//                 status: false,
//                 data: "Already Exist"
//             })
//         }
//     }
// };

// module.exports.getData = async (req, res) => {
//     try {
//         const data = await Register.find({});
//         const resp = await data;

//         if(resp) {
//             res.send({
//                 status:true,
//                 data: resp
//             })
//         }

//     } catch (error) {
//         console.log(error);

//         res.send({
//             status: false,
//             data: error
//         })
//     }
// }

// module.exports.getDataCount = async (req, res) => {
//     try {
//         const data = await Register.aggregate([
//             {
//                 $group : {
//                     _id : null,
//                     totalDocs : {
//                         $sum : 1
//                     }
//                 }
//             }
//         ])

//         res.send({
//             status : true,
//             data
//         })

//     } catch (error) {
//         console.log(error);
//         res.send({
//             status : false,
//             error
//         })
//     }
// }

// ----------------------------------------------------- suraj ------------------------------------------------------
const express = require('express');
const bcrypt = require('bcrypt');
const { dbcoll } = require('../../DB/conn');


const register = async (req, res) => {
    console.log("Request Body:", req.body);
    let filename;
    if (req.file) {
        filename = req.file.filename; 
    }
    const { username, password, number, email, address } = req.body;
    try {
        if (!username || !password || !number || !email || !address) {
            return res.status(400).send({
                success: false,
                msg: "Fill All Details"
            });
        }

        const collection = await dbcoll('register');
        const data = await collection.find({ $or: [{ username }, { email }] }).toArray();

        if (data.length > 0) {
            return res.status(400).send({
                success: false,
                msg: "Data Already Present"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = {
            username,
            password: hashedPassword,
            number,
            address,
            email,
            image: filename 
        };

        const newRegisterUser = await collection.insertOne(newUser);
        console.log('newRegisterUser', newRegisterUser);
        res.status(200).send({
            success: true,
            msg: "Data Added Successfully"
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            msg: "Error occurred",
            error: error.message
        });
    }
};

module.exports = { register };
