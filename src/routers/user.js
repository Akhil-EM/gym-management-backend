var express= require('express');
var {userModel}=require('../models/userModel');
var userRoute=express.Router();


function route(){

    userRoute.route('/')
    .get((req, res) => {
        res.send("user route works !!")
    });
   userRoute.route('/signup')
    .post((req, res) => {
        console.log(req.body.email);
             var user={
                userId:(req.body.Name+req.body.email+req.body.password+"gym_management_id"),
                Name:req.body.Name,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                type:req.body.type,
                gymName:req.body.gymName,
                ActiveStatus:req.body.ActiveStatus}


       var user=new userModel(user);
       userModel.findOne({email:req.body.email},(err,data)=>{
        if (err) {
            res.json({ status: "Error" });
        }
        else if (!data) {
            ///res.json({ status: "new user" });
            user. save((err,result)=>{
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

    userRoute.route('/deleteuser')
    .post((req,res)=>{
       //var qus=new questionModel(req.body);
       console.log(req.body);
       userModel.deleteOne({id :req.body.id}, function (err, result) {
        if (err) {

            res.json({status:"error query"});
            console.log("error query");

        } else {
            res.json({status:resul});
            console.log(result);

        }

    });
    // need to work on delete section
    //    .findOneAndRemove({id :req.body.id}, function (err,offer){
    //     if(!err)
    //     {
    //         res.json({status:err});
    //     }
    //     else
    //     {
    //        res.json({status:"success"});
    //          // res.json({status:offer})
    //      }
    //   });
    }) 

    userRoute.route('/login')
    .post((req, res) => {
        console.log(req.body);
        var logcre={
            email:req.body.email,
            password:req.body.password}
        
        userModel.findOne(logcre,(err,data)=>{
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
    userRoute.route('/edit')
    .post((req, res) => {
        var user={
            userId:(req.body.Name+req.body.email+req.body.password+"gym_management_id"),
                Name:req.body.Name,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                type:req.body.type,
                gymName:req.body.gymName}
        userModel.findByIdAndUpdate(req.body.id,{$set:user},
            (err,result)=>{
                
              if(err)
              {console.log("err"+req.body.id)

                  res.json({Status:"Error"});
              }
              else{
                   console.log("sucsuss"+req.body.id)
                  res.json({Status:"Success",data:user});
              }
            });

    });
    return userRoute;

}
module.exports=route;