const CustCart = require('../../models/cart');
const Category = require('../../models/category');

module.exports.addCart = async (req, res) => {

    const {userid, categName} = req.body;

    try {
        const data = await Category.aggregate([
            {
                $match : {
                    categName
                }
            }
        ]);

        if(data) {
            const resp = await CustCart ({
                userid,
                mainCateg : data[0].mainCateg,
                categName : data[0].categName,
                categDiscript : data[0].categDiscript,
                price : data[0].price,
                img : data[0].img
            });

            const data_save = await resp.save();

            res.send({
                status : true,
                data : data_save
            })

        }

    } catch (error) {
        console.log(error);
        res.send({
            status : false,
            msg : error
        })
    }
}

module.exports.getCartCount = async (req, res) => {

    const {userid} = req.params

    try {
        const data = await CustCart.find({userid}).lean();

        res.send({
            count : data.length
        });

    } catch (error) {
        console.log(error);
        res.send({
            status : false,
            msg : error
        })        
    }
}