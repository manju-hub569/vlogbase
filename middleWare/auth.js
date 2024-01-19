const Register = require('../models/register');
const jwt = require('jsonwebtoken');

module.exports.Auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.jwtoken_key);
        
        const data = await Register.findOne({_id:decode._id});
        if(data && decode) {
            req.user = data;
            next();
        } else {
            res.send({
                status : false,
                msg : "Auth Error"
            });
        }       
    } catch (error) {
        console.log(error)
        if(error) {
            res.status(400).send({
                status: false,
                msg: "Please Login To Continue"
            })
        }
    }

}