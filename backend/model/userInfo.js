const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    // isAdmin:{
    //     type:Boolean,
    //     default:false
    // }
},
    {timestamps:true}
);

const UserInfo = mongoose.model('UserInfo',userSchema);
module.exports = UserInfo;