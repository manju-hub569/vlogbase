const Register = require('../../models/register');
const bcrypt = require('bcrypt');

module.exports.postData = async (req, res) => {
    
    const {username, password, email, mobile, address} = req.body;

    try {

        if(username == '' || password == '' || email == '' || mobile == '' || address == '') {
            res.send({
                data:"Please Enter All Data"
            })
        } else if (username && password && email && mobile && address) {

            let pass = await bcrypt.hash(password, 10);

            const save_data = await Register({
                username,password:pass,email,address,mobile
            });

            const data_save = await save_data.save();

            res.status(200).send({
                status: true,
                data: data_save
            })

        }
        
    } catch (error) {
        if(error) {
            res.send({
                status: false,
                msg: "duplicate key Found"
            })
        }
    }
};