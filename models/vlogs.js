const mongoose = require('mongoose');

const eVlog = mongoose.Schema({

    userid: {
        type:mongoose.Schema.Types.ObjectId
    },

    vlog: {
        type:String,
        unique:true
    }
});

VlogData = mongoose.model('vlogs', eVlog);

module.exports = VlogData;