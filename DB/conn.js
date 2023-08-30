const mongoose = require('mongoose');
const {config} = require('../utils/dbConfig');

    mongoose.connect(config().mongoTest(), {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(() => {
        console.log('DataBase Connect SuccessFull');
    }).catch((e) => {
        console.log(e);
    });