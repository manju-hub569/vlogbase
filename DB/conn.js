const mongoose = require('mongoose');
const {config} = require('../utils/dbConfig');

    mongoose.connect('mongodb+srv://manju:manimanju@cluster0.2jahpsh.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(() => {
        console.log('DataBase Connect SuccessFull');
    }).catch((e) => {
        console.log(e);
    });