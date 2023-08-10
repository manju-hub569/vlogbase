const Register = require('../models/register');
const jwt = require('jsonwebtoken');

module.exports.Auth = async (req, res, next) => {

    try {
        const token = req.cookies.token;
        const decode = jwt.verify(token, process.env.jwtoken_key);
        
        const data = await Register.findOne({_id:decode._id});
        if(data) {
            req.user = data;
            next();
        } else {
            res.send("Authentication Error");
        }       
    } catch (error) {
        if(error) {
            res.status(400).send({
                status: false,
                msg: "Please Login To Continue"
            })
        }
    }

}