const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Register = require('../../models/register');

module.exports.login = async (req, res) => {

    try {
        const {username , password} = req.body;

        const data = await Register.findOne({username});
    
        let token = jwt.sign({_id:data._id}, process.env.jwtoken_key, {
            expiresIn: 60 * 60 * 24 * 7
        });
    
        // res.cookie("token", token, {
        //     httpOnly: true
        //     // sameSite: 'None', secure: true
        // })
    
        let pass = await bcrypt.compare(password, data.password);
    
        if(pass) {
            res.status(200).send({
                stat: true,
                msg:"Login Success",
                token
            })
        } else {
            res.status(400).send({
                stat: false,
                msg:"Login Unsuccess"
            });            
        };       
    } catch (error) {
        console.log(error)
        res.status(400).send({
            stat: false,
            msg:error
        });
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('token', {path:'/'});
        res.status(200).send({
            status: true,
            msg: "Logout Successfull"
        });
    } catch (error) {
        res.send({
            error
        })
    }
}