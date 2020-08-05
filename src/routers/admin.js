///console.log("hello ");
var express=require('express');
 var adminRoute=express.Router();
 var {questionModel}=require('../models/questionsModel');
  
 function route()
 {
        adminRoute.route('/')
        .get((req,res)=>{
            res.send("admin router workes !!")
        })
        // adminRoute.route('/addqus')
        // .post((req,res)=>{
           
        //     console.log(req.body);
 
        // var qus = new questionModel(req.body);
        //      .save((err) => {
        //         if (err) {
        //             res.json({status:"error"});
        //         }
        //         else {
        //             //console.log(result);
        //             res.json({status:"success"});
        //         }
        //     });
        // })
        adminRoute.route('/addqus')
        .post((req, res) => {
            console.log(req.body);
                 var quiz={
                    id:req.body.id,
                    topic:req.body.topic,
                    question:req.body.question,
                    ans1:req.body.ans1,
                    ans2:req.body.ans2,
                    ans3:req.body.ans3,
                    ans4:req.body.ans4,
                    right:req.body.right
                 }
              console.log("**********")
              console.log(quiz);
           
           var quiz=new questionModel(quiz);
               quiz.save((err,result)=>{
                 if(err)
                 {
                     res.json({status:"error"});
                 }
                 else{
                     console.log(result);
                     res.json({status:"success"})
                 }
             })
        });
        adminRoute.route('/deletequs')
        .post((req,res)=>{
           //var qus=new questionModel(req.body);
           console.log(req.body);
           questionModel.findOneAndRemove({id :req.body.id}, function (err,offer){
            if(err)
            {
                res.json({status:err});
            }
            else
            {
                res.json({status:"success"});
             }
          });
        }) 
         var id;
        adminRoute.route('/getid')
        .post((req,res)=>{
            questionModel.find().sort({id:'desc'}).limit(1)
            .exec(function(err, data) {
                  id=data[0].id;
                  console.log(id)
                if (err) {
                    res.json({ status: "Error" });
                }
                else {
                    console.log(data);
                    res.json({status:id});
                }
            });
              });
    return adminRoute;
 }
 
 module.exports=route;
