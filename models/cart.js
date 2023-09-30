const mongoose = require('mongoose');

const cCart = mongoose.Schema({

    userid: {
        type:mongoose.Schema.Types.ObjectId
    },

    mainCateg : {
        type : String,
        unique : true
    },
    categName : {
        type : String,
        unique : true
    },
    categDiscript : {
        type : String,
        unique : true
    },
    price : {
        type : Number
    },
    img :{
        type: String,
        unique: false
    }
});

CustCart = mongoose.model('cCarts', cCart);

module.exports = CustCart;