const mongoose = require('mongoose');

    mongoose.connect('mongodb+srv://manju-tech:manimanju@cluster0.xqn2i.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(() => {
        console.log('DataBase Connect SuccessFull');
    }).catch((e) => {
        console.log(e);
    });