const express=require('express');
var {sloatsModel}=require('../models/sloatsModel')
var {settingsModel}=require('../models/settingsModel')
var myincludes = require('../other/externalFunctions');
const { convertTime12to24 } = require('../other/externalFunctions');
const sloatsRoute=express.Router();

function route()
{

    sloatsRoute.route('/')
    .get((req,res)=>{
        res.send("sloats router workes !!")
        
    });

    //sloats get generated here 
    sloatsRoute.route('/generate-sloat')
    .post((req,res)=>{
        // console.log(myincludes.getWeek())
        // res.send("sloats router workes !!")

       
    
    //// console.log(times_ara);
       /////// res.send("sloats");
        settingsModel.findOne({gymName:req.body.gymName,week:myincludes.getWeek()},(err,data)=>{
            if(err){
                res.json({status:"error"})
            }
            else if(!data)
            {
                res.json({status:"settings not found"});
            }
            else{
            
               console.log(data.startingTime+" "+data.endingTime+" "+data.timeDuration)
               
               var startTime =data.startingTime;
                var endTime =data.endingTime;
                var start_time = parseTime(startTime),
                    end_time = parseTime(endTime),
                    interval =parseInt(data.timeDuration)
                var times_ara = calculate_time_slot( start_time, end_time, interval );
                    
                res.send(arry_sliced(times_ara))
              
            }
        })
        

    });
    sloatsRoute.route('/addsloat')
     .post((req,res)=>{
        console.log(req.body);
        var sloats={
            week:req.body.week,
            gymName:req.body.gymName,
            sloats:req.body.sloats,
        }


        var sloats=new sloatsModel(sloats);
        /// sloats must be created from front end they only get saved here 
        settingsModel.findOne({gymName:req.body.gymName,week:req.body.week},(err,data)=>{
         if (err) {
             res.json({ status: "error" });
         }
         else if (!data) {
             res.json({ status: "settings not found" });
             
         }
         else {
            // res.json({ status:"settings found"});
            sloats. save((err,result)=>{
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
    });
    return sloatsRoute;
}
// function startOfWeek(date)
//   {
//     var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -7 : 1);
//     var weekstart=new Date(date.setDate(diff))
//     var weekend=new Date(date.setDate(diff+7))
//     return weekstart+","+weekend ;
 
//   }
function counter(time)
{
    let h=time.slice
}
function parseTime(s) {
    var c = s.split(':');
    return parseInt(c[0]) * 60 + parseInt(c[1]);
  }

  function convertHours(mins){
    var hour = Math.floor(mins/60);
    var mins = mins%60;
    var converted = pad(hour, 2)+':'+pad(mins, 2);
    return converted;
  }

  function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }

  function calculate_time_slot(start_time, end_time, interval = "30"){
      var i, formatted_time;
    var time_slots = new Array();
      for(var i=start_time; i<=end_time; i = i+interval){
      formatted_time = convertHours(i);
      time_slots.push(formatted_time);
    }
    return time_slots;
  }
  function arry_sliced(arr)
  {
    console.log(arr);
    var sloat_arry=new Array();
    for(var i=0;i<=arr.length-2;i++)
    {
        sloat_arry.push(arr[i]+"-"+arr[i+1])
    }
    return sloat_arry
  }
module.exports=route;