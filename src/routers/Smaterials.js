const express=require('express');

const SmaterialRoute=express.Router();

function router()
{
   SmaterialRoute.route('/')
    .get((req,res)=>{
         res.send("Smaterial works fine !! ");

    });

    SmaterialRoute.route('/view')
    .post((req,res)=>{
         res.send("Smaterial view works fine !! ");
         
    });
   return SmaterialRoute;
}

module.exports=router;