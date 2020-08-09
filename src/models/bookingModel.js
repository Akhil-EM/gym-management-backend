const mongoose=require('mongoose');
const schema=mongoose.Schema;

var bookingSchema = new schema({
    email:String,
    date:String,
    sloat:String,
    gymName:String,
    name:String
});
var bookingModel= mongoose.model('bookings',bookingSchema);
module.exports ={bookingModel};

