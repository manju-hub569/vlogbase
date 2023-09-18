const mongoose = require('mongoose');

const categ = new mongoose.Schema({
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

const category = new mongoose.model('category', categ);

module.exports = category;