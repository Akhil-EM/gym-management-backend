const mongoose=require('mongoose');
const schema=mongoose.Schema;

var gymSchema = new schema({
    gymName:String,
    gymPlace:String,
    phone:Number,
});
var gymModel= mongoose.model('gym',gymSchema);
module.exports ={gymModel};

