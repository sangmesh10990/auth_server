const jwt =  require('jsonwebtoken');
const mongoose = require('mongoose');
const User  = mongoose.model('User');
//const {jwtKey} = require('../keys');
const {jwtkey} = require('../keys');


module.exports = (req,res,next) =>{ 
     const { authorization }= req.headers;
     if(!authorization){
         return res.status(401).send({error :"You must be log in"})
     }
     const token = authorization.replace("Bearer ","");
     console.log("Token" + token);
     console.log("jwtKey : " + jwtkey);
     jwt.verify(token,jwtkey,async (err,payload)=>{
         if(err){
             res.status(401).send(err.message);
         }
          
         
         const { userId } = payload
         const user = await User.findById(userId)
         req.user = user;
             next();
        })
    }