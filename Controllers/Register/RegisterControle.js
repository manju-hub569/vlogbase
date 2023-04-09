const Register = require('../../models/register');
const bcrypt = require('bcrypt');

module.exports.postData = async (req, res) => {
    
    const {username, password} = req.body;

    try {

        if(username == '' || password == '') {
            res.send({
                data:"Please Enter All Data"
            })
        } else if (username && password) {

            let pass = await bcrypt.hash(password, 10);

            const save_data = await Register({
                username,password:pass
            });

            const data_save = await save_data.save();

            res.send({
                data: data_save
            })

        }
        
    } catch (error) {
        console.log(error)
        if(error) {
            res.send({
                msg: "Signup Falid"
            })
        }
    }
};