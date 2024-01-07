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

    const connectToMongo = (mongoUrl) => {
        return new Promise((resolve, reject) => {
          MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            if (err) {
              reject(err);
            } else {
              resolve(client.db("myapp"));
            }
          });
        });
      };

      module.exports.dbcoll = async (colname) => {
        const mongoUrl = config().mongoTest();
        try {
          const db = await connectToMongo(mongoUrl);
          return db.collection(colname);
        } catch (err) {
          throw err;
        }
      };