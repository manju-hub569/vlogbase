const CustCart = require('../../models/cart');
const Category = require('../../models/category');

module.exports.addCart = async (req, res) => {

    try {

    const data = await CustCart(req.body);

    const resp = await data.save();

    res.send( {
        status : true ,
        data : resp
    })

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