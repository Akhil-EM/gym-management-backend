const mongoose=require('mongoose');
const schema=mongoose.Schema;

var postSchema = new schema({
    heading:String,
    date: { type: Date, default: Date.now },
    content:String,
    Uid:String,
});
var postModel= mongoose.model('post',postSchema);
module.exports ={postModel};