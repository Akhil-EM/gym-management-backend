const mongoose=require('mongoose');
const schema=mongoose.Schema;

var settingsSchema = new schema({
    gymName:String,
    timeDuration:String,
    startingTime:Number,
    endingTime:Number
});
var settingsModel= mongoose.model('gym',settingsSchema);
module.exports ={settingsModel};

