const express=require('express');
var {questionModel}=require('../models/questionsModel');
var {postModel}=require('../models/postModel')
const qustionRoute=express.Router();

function route()
{

    qustionRoute.route('/')
    .get((req,res)=>{
        res.send("qustion router workes !!")
    });
    qustionRoute.route('/viewquiz')
    .post((req,res)=>{
           var topi=req.body.data;
         console.log(req.body.data)
         questionModel.find({topic:topi},(err, data) => {
            if (err) {
                res.json({ status: "Error" });
            }
            else {
                //console.log(data);
                res.json({status:data});
            }
        });      
    })
    qustionRoute.route('/viewpost')
    .post((req,res)=>{
         var topi=req.body.topic;
         console.log(topi)
         postModel.find((err, data) => {
            if (err) {
                res.json({ status: "Error" });
            }
            else {
                //console.log(data);
                res.json({status:data});
            }
        });      
    })

    qustionRoute.route('/addpost')
        .post((req,res)=>{
            console.log(req.body);
 
            var pos = new postModel(req.body);
                pos.save((err, result) => {
                    if (err) {
                        res.json({status: "error" });
                    }
                    else {
                        console.log(result);
                        res.json({status:"success"});
                    }
                });
        });
 

    return qustionRoute;
}
module.exports=route;