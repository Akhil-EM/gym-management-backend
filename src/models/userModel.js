const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var userSchema =new Schema({
    userId:String,
    Name:String,
    email:String,
    password:String,
    phone:Number,
    type:String,
    gymName:String,
    ActiveStatus:String
});

var userModel=mongoose.model('user',userSchema);
module.exports ={userModel};