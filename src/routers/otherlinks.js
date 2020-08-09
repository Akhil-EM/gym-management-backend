const express=require('express');
var {sloatsModel}=require('../models/sloatsModel')
var {settingsModel}=require('../models/settingsModel')
var myincludes = require('../other/externalFunctions');
const otherLinksRoute=express.Router();

function route()
{

    otherLinksRoute.route('/')
    .get((req,res)=>{
        res.send("other links router workes !!")
        
    });
    otherLinksRoute.route('/get-week')
    .get((req,res)=>{
        res.send({"week":myincludes.getWeek()})
        
    });
   
    return otherLinksRoute;
}


module.exports=route;