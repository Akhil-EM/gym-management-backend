const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var questionSchema= new Schema({
    id:Number,
    topic:String,
    question:String,
    ans1:String,
    ans2:String,
    ans3:String,
    ans4:String,
    right:String
});

var questionModel = mongoose.model('questions',questionSchema);
module.exports ={questionModel};