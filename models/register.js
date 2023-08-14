const mongoose = require('mongoose');

const eReg = mongoose.Schema({
    username: {
        type:String,
        unique: false
    },
    password: {
        type:String,
        unique:true
    },
    email: {
        type:String,
        unique:true
    },
    address: {
        type:String,
        unique: false
    },
    mobile: {
        type:String,
        unique: false
    },
    img: {
        type: String,
        unique: false
    }
});

Register = mongoose.model('register', eReg);

module.exports = Register;