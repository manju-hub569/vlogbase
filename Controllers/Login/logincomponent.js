// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const Register = require('../../models/register');

// module.exports.login = async (req, res) => {

//     try {
//         const {username , password} = req.body;

//         const data = await Register.findOne({username});

//         let token = jwt.sign({_id:data._id}, process.env.jwtoken_key, {
//             expiresIn: 60 * 60 * 24 * 7
//         });

//         // res.cookie("token", token, {
//         //     httpOnly: true
//         //     // sameSite: 'None', secure: true
//         // })

//         let pass = await bcrypt.compare(password, data.password);

//         if(pass) {
//             res.status(200).send({
//                 stat: true,
//                 msg:"Login Success",
//                 token
//             })
//         } else {
//             res.status(400).send({
//                 stat: false,
//                 msg:"Login Unsuccess"
//             });            
//         };       
//     } catch (error) {
//         console.log(error)
//         res.status(400).send({
//             stat: false,
//             msg:error
//         });
//     }
// }

// module.exports.logout = async (req, res) => {
//     try {
//         res.clearCookie('token', {path:'/'});
//         res.status(200).send({
//             status: true,
//             msg: "Logout Successfull"
//         });
//     } catch (error) {
//         res.send({
//             error
//         })
//     }
// }

// ---------------------------------------------- suraj -----------------------------------------------------------
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { dbcoll } = require('../../DB/conn');

const Secret_Key_Authentication = process.env.Secret_Key_Authentication || 'This_is_SecretKey@1155jaishreeram@108'
let jwtExpTime = 900;

const login = async (req, res) => {
    console.log("Request Body:", req.body);
    const { userName, password } = req.body;
    try {
        if (!userName || !password) {
            return res.status(400).send({
                success: false,
                msg: "Provide both username and password in req.body"
            });
        }

        const collection = await dbcoll('register');
        const user = await collection.findOne({ userName });

        if (!user) {
            return res.status(404).send({
                success: false,
                msg: "User not found"
            });
        }

        const matchedPassword = await bcrypt.compare(password, user.password);
        console.log("matchedPassword", matchedPassword)
        if (!matchedPassword) {
            return res.status(401).send({
                success: false,
                msg: "Invalid password"
            });
        }

        const token = jwt.sign({ _id: user._id, userName: user.userName }, Secret_Key_Authentication, { expiresIn: jwtExpTime })
        res.status(200).send({
            success: true,
            msg: "Login successful",
            // data: user,
            _id: user._id,
            userName: user.userName,
            token: token
           
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            msg: "Error occurred",
            error: error.message
        });
    }
};

module.exports = { login };
