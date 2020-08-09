const mongoose=require('mongoose');
const schema=mongoose.Schema;

var sloatsSchema = new schema({
    week:String,
    gymName:String,
    sloats:String,
});
var sloatsModel= mongoose.model('sloats',sloatsSchema);
module.exports ={sloatsModel};

