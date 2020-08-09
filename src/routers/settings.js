const express=require('express');
var {settingsModel}=require('../models/settingsModel')
const settingsRoute=express.Router();
var myincludes = require('../other/externalFunctions');
function route()
{

    settingsRoute.route('/')
    .get((req,res)=>{
        res.send("settings router workes !!")
    });
    settingsRoute.route('/addsettings')
    .post((req,res)=>{
        console.log(req.body);
        var settings={
            week:myincludes.getWeek(),
            gymName:req.body.gymName,
            timeDuration:req.body.timeDuration,
            startingTime:myincludes.convertTime12to24(req.body.startingTime),
            endingTime:myincludes.convertTime12to24(req.body.endingTime),
            memberPerSloat:req.body.memberPerSloat
         }
         
         var gymcre={
            gymName:req.body.gymName,
            week:myincludes.getWeek()
        }

   var settings=new settingsModel(settings);
        settingsModel.findOne(gymcre,(err,data)=>{
            if (err) {
                res.json({ status: "Error" });
            }
            else if (!data) {
                settings.save((err,result)=>{
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
            else {
                res.json({ status:"previously added"});
            }
        })
        

    //        
    });
    settingsRoute.route('/view')
        .post((req,res)=>{
            console.log(req.body)
            var gymcre={
                gymName:req.body.gymName,
                week:myincludes.getWeek()
            }
            
            settingsModel.findOne(gymcre,(err,data)=>{
                if (err) {
                    res.json({ status: "Error" });
                }
                else if (!data) {
                    res.json({ status: "Invalid" });
                }
                else {
                    res.json({ status:data,key:"true"});
                }
            })
        });    


    return settingsRoute;
}
module.exports=route;