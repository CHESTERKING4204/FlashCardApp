const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    question:{
        type:String,
        require:true
    },
    answer:{
        type:String,
        require:true
    }
},
    {timestamps:true}
);

const qa = mongoose.model('qa', userSchema);

module.exports = qa;