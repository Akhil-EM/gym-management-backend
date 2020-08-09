const express=require('express');
var {bookingModel}=require('../models/bookingModel')
const bookingsRoute=express.Router();
var myincludes = require('../other/externalFunctions');
const {gymModel} = require('../models/gymModel');
function route()
{

    bookingsRoute.route('/')
    .get((req,res)=>{
        res.send("settings router workes !!")
    });
    bookingsRoute.route('/new-booking')
    .post((req,res)=>{
        //res.send("new booking works")
        var bookings={
            email:req.body.email,
            date:myincludes.getdate(),
            sloat:req.body.sloat,
            gymName:req.body.gymName,
            name:req.body.name
         }
         var bookings = new bookingModel(bookings);
         ///console.log(myincludes.getdate())
         //res.send("hello guys");
         gymModel.findOne({gymName:req.body.gymName},(err,data)=>{
            if (err) {
                res.json({ status: "Error" });
            }
            else if (!data) {
                res.json({ status: "gym not found" });
                
            }
            else {
                 
                       console.log(myincludes.getdate()+","+req.body.email)
                    //    var logcre=
                        bookingModel.findOne({
                            date:"Sun Aug 08 2020",
                            email:req.body.email,
                            gymName:req.body.gymName
                             },(err,data)=>{
                            if (err) {
                                res.json({ status: "Error" });
                            }
                            else if (data) {
                                  res.send("already booked")
                            }
                            else {

                               

                                bookings.save((err,result)=>{
                                    if(err)
                                    {
                                        res.json({status:"error insert"});
                                    }
                                    else{
                                        console.log(result);
                                        res.json({status:"success"})
                                    }
                                })
                               
                                
                            }
                        }) 

            }
        }) 
        
        
    });
    bookingsRoute.route('/view-bookings')
    .get((req,res)=>{
        res.send("settings router workes !!")
    });
    return bookingsRoute;
}
module.exports=route;