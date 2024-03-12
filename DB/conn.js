// const mongoose = require('mongoose');
// const {config} = require('../utils/dbConfig');

//     mongoose.connect(config().mongoTest(), {
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//     }).then(() => {
//         console.log('DataBase Connect SuccessFull');
//     }).catch((e) => {
//         console.log(e);
//     });

//----------------------------------------------- suraj -------------------------------------------

//------------------------------------------- Mongodb Client ---------------------------------------- 

const MongoClient = require('mongodb').MongoClient;
module.exports = async function (mongoose) {
    try {
        const mongoUrl = 'mongodb://127.0.0.1:27017/ecommerce-store';
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("DB is connected at", mongoUrl);
    } catch (error) {
        console.log(`Error connecting to DB: `, error);
    }
}

const connectToMongo = async (mongoUrl) => {
    try {
        const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        return client.db("ecommerce-store");
    } catch (err) {
        throw err;
    }
};

module.exports.dbcoll = async (colname) => {
    const mongoUrl = 'mongodb://127.0.0.1:27017/';
console.log('Connection Successful')
    try {
        const db = await connectToMongo(mongoUrl);
        return db.collection(colname);
    } catch (err) {
        throw err;
    }
};
