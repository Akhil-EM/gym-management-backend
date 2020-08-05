const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var fameSchema = new Schema({
    id:String,
    name:String,
    mark:Number
});

var fameModel = mongoose.model('fame',fameSchema);
module.exports ={fameModel};