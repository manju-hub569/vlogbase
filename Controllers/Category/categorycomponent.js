const category = require('../../models/category');

module.exports.addcategory = async (req, res) => {

    const {mainCateg, categName, categDiscript, price} = req.body;

    try {
        if(mainCateg == '' || categName == '' || categDiscript == '' || price == '') {
            res.send({
                status : false,
                msg:"Please Fill All Details"
            })
        } else if (mainCateg && categName && categDiscript && price) {

            let image = "";
            if(req.file == undefined) {
                image = "default.png"
            }else{
                image = req.file.filename
            }

            const save_data = await category({
                mainCateg,categName,categDiscript,price,img:image
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
}

module.exports.getCateg = async (req, res) => {
    try {
        const data = await category.find();
        if(data) {
            res.send({
                status : true,
                data
            })
        } else {
            res.send({
                status : false,
                msg : "Not Found"
            })
        }
    } catch (error) {
        console.log(error);
        res.send({
            status : false,
            msg : 'Not Found Data'
        })
    }
}