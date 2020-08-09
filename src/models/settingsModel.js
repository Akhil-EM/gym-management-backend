const mongoose=require('mongoose');
const schema=mongoose.Schema;

var settingsSchema = new schema({
    week:String,
    gymName:String,
    timeDuration:String,
    startingTime:String,
    endingTime:String,
    memberPerSloat:String,
});
var settingsModel= mongoose.model('settings',settingsSchema);
module.exports ={settingsModel};

