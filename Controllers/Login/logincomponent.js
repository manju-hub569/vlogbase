const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Register = require('../../models/register');

module.exports.login = async (req, res) => {

    try {

        const {username , password} = req.body;

        const data = await Register.findOne({username});
    
        let token = jwt.sign({_id:data._id}, process.env.jwtoken_key, {
            expiresIn: 60 * 2
        });
    
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 25892000000)
        })
    
        let pass = await bcrypt.compare(password, data.password);
    
        if(pass) {
            res.status(200).send({
                stat: true,
                msg:"Login Success"
            })
        } else {
            res.status(400).send({
                stat: false,
                msg:"Login Unsuccess"
            });            
        };       
    } catch (error) {
        res.status(400).send({
            stat: false,
            msg:error
        });
    }
}