const express = require("express");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtkey} = require('../keys');
const router = express.Router();
const User = mongoose.model('User'); 

router.post("/signup",async (req,res)=>{
    const {email,password} = req.body;
     try{
        const user = new User({email,password});
       await  user.save();
       const token = jwt.sign({userId:user._id},jwtkey)
       res.send({token});

     }catch(err){
      return  res.status(422).send(err.message);
     }
  

});


router.post("/signin",async(req,res)=>{
  try{
    const {email,password} = req.body;
    if(!email || !password){
      console.log("must provide email or padd1");
      return  res.status(422).send({error :"must provide email or padd1" }); 
    }
 //Find in database..   
      const user = await User.findOne({$and: [{email: email},  
      {password: password}]})
      
      if(!user){
        console.log("must provide email or padd2");
        return  res.status(422).send({error :"must provide email or padd2" });
      }
      
     // await user.comparePassword(password);
      
     const token = jwt.sign({userId:user._id},jwtkey)
     //res.send({token});
    res.status(200).send(true);
console.log({token});
     //res.status(200).send({success :"must provide email or padd2" });

   }catch(err){
    console.log("must provide email or padd33");
    return  res.status(422).send(err.message);
   
   }
 
   
 

});


module.exports = router
 
