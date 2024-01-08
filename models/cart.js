const mongoose = require('mongoose');

const cCart = mongoose.Schema({

    userid: {
        type:mongoose.Schema.Types.ObjectId
    },

    title : {
        type : String,
        unique : true
    },
    price : {
        type : String,
        unique : true
    },
    description : {
        type : String,
        unique : true
    },
    category : {
        type : String
    },
    image :{
        type: String,
        unique: false
    }
});

CustCart = mongoose.model('cCarts', cCart);

module.exports = CustCart;