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

            let image = "";
            if(req.file == undefined) {
                image = "default.png"
            }else{
                image = req.file.filename
            }

            const save_data = await Register({
                username,password:pass,email,address,mobile,img:image
            });

            const data_save = await save_data.save();

            res.status(200).send({
                status: true,
                data: data_save
            })

        }
        
    } catch (error) {
        if(error) {
            console.log(error)
            res.send({
                status: false,
                msg: "duplicate key Found"
            })
        }
    }
};

module.exports.getData = async (req, res) => {
    try {
        const data = await Register.find({});
        const resp = await data;

        if(resp) {
            res.send({
                status:true,
                data: resp
            })
        }

    } catch (error) {
        console.log(error);

        res.send({
            status: false,
            data: error
        })
    }
}

module.exports.getDataCount = async (req, res) => {
    try {
        const data = await Register.aggregate([
            {
                $group : {
                    _id : null,
                    totalDocs : {
                        $sum : 1
                    }
                }
            }
        ])

        res.send({
            status : true,
            data
        })

    } catch (error) {
        console.log(error);
        res.send({
            status : false,
            error
        })
    }
}