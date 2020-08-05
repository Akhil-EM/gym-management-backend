var express=require('express');
var {fameModel}=require('../models/fameModel');
const fameRoute=express.Router();
function route()
{
   fameRoute.route('/')
    .get((req,res)=>{
        res.send(" wall of fame works !!");
    });

    fameRoute.route('/view')
    .post((req,res)=>{
        fameModel.find({}).sort({mark:-1}).exec(function(err, data) {
            if (err) {
                res.json({ status: "Error" });
            }
            else {
                console.log(data);
                res.json({status:data});
            }
        });
          });
    fameRoute.route('/insert')
    .post((req,res)=>{
        var fame={
            name:req.body.name,
            mark:req.body.mark,
             id:req.body.id}


   var fameM=new fameModel(fame);
     fameM.save((err,result)=>{
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
    return fameRoute;
}

module.exports=route;