// const Register = require('../models/register');
// const jwt = require('jsonwebtoken');

// module.exports.Auth = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decode = jwt.verify(token, process.env.jwtoken_key);

//         const data = await Register.findOne({_id:decode._id});
//         if(data && decode) {
//             req.user = data;
//             next();
//         } else {
//             res.send({
//                 status : false,
//                 msg : "Auth Error"
//             });
//         }       
//     } catch (error) {
//         console.log(error)
//         if(error) {
//             res.status(400).send({
//                 status: false,
//                 msg: "Please Login To Continue"
//             })
//         }
//     }

// }

// -------------------------------------------------- suraj -------------------------------------------------

const jwt = require('jsonwebtoken');
const { dbcoll } = require('../DB/conn');
const Secret_Key_Authentication = process.env.Secret_Key_Authentication || 'This_is_SecretKey@1155jaishreeram@108'
let jwtExpTime = 900;

const AdminAuthorization = async (req, res, next) => {
    console.log("AdminAuthorizations", req.body)
    try {
        const token = req.body.token || req.headers.token || req.headers.authorization
        let existingToken
        if (req.headers.authorization) {
            existingToken = token.split(" ")[1]

        } else {
            existingToken = token
        }

        const decode = jwt.verify(existingToken, Secret_Key_Authentication)
        console.log("decode", decode)
        if (decode) {
            const collection = await dbcoll('register')
            const userExist = await collection.findOne({ userName: decode.userName || decode.userName })
            console.log("userExist", userExist)

            const newToken = jwt.sign({ userName: userExist.userName, _id: userExist._id }, Secret_Key_Authentication, { expiresIn: jwtExpTime })
            console.log("newToken", newToken);
            req.tokenDetails = {
                success: true,
                userName: userExist.userName,
                _id: userExist._id,
                newToken: newToken
            }
            next()
        } else {
            req.tokenDetails = {
                success: false,
                msg: "Data Not Found, Token Not Generated",
                error: error.message

            }
            res.status(500).send({
                tokenDetails: req.tokenDetails
            })


        }
    } catch (error) {
        res.status(500).send({
            success: false,
            msg: "Data Not Found"
        })

    }


}


const AdminVerification = async (req, res, next) => {
    let token = req.body.token || req.headers.token || req.headers.authorization
    let existingToken
    if (req.headers.authorization) {

        existingToken = token.split(" ")[1]
    }
    else {
        existingToken = token
    }
    console.log("token...", existingToken);
    if (existingToken != "" && existingToken != undefined) {
        try {

            const verified = jwt.verify(existingToken, Secret_Key_Authentication );
            console.log(`verified ${verified}`)
            console.log("verified", verified)

            let obj = {
                success: true,
                message: "Successfully verified",
                verified:verified
            }

            req.verifiedUserDetails = obj
            res.status(200).send(obj)
            // next();
        }
        catch (error) {

            console.log("authentication error", error);
            res.status(400).send({
                success: false,
                message: "Not Successfull",
                error: error.message
            });
        }
    }
    else {
        console.log("Please send Token ");
        res.status(400).send({
            success: false,
            message: "Please send Token",
            // errror : error.message
        });
    }
}





module.exports = { AdminAuthorization ,AdminVerification}