const express=require('express');
var {gymModel}=require('../models/gymModel')
const gymRoute=express.Router();

function route()
{

    gymRoute.route('/')
    .get((req,res)=>{
        res.send("gym router workes !!")
    });
    gymRoute.route('/addgym')
        .post((req,res)=>{
            console.log(req.body);
            var gym = new gymModel(req.body);
            gymModel.findOne({gymName:req.body.gymName},(err,data)=>{
                if (err) {
                    res.json({ status: "Error" });
                }
                else if (!data) {
                    ///res.json({ status: "new user" });
                    gym.save((err,result)=>{
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
                    res.json({ status:"user exists"});
                }
            })  
                
        });
    
        gymRoute.route('/viewgym')
        .post((req, res) => {
            console.log(req.body);
            var gym={
                gymName:req.body.gymName
            }
            gymModel.findOne(gym,(err,data)=>{
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
 

    return gymRoute;
}
module.exports=route;