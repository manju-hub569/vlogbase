const mongoose = require('mongoose');

const eVlog = mongoose.Schema({
    userID: {
        type:mongoose.Schema.Types.ObjectId
    },
    vlog: {
        type:String,
        unique:true
    },

    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

VlogData = mongoose.model('vlogs', eVlog);

module.exports = VlogData;