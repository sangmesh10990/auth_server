const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        unique:true,
        required:true
    },
    password : {
        type:String,
        required :true
    }
})


// userSchema.pre('save',function(next){
//     console.log("SAVE Func Pre")
//     const user = this;
//     if(!user.isModified('password')){
//        return next();
//        console.log("SAVE Func isModified")
//     }
//     bcrypt.genSalt(10,(err,salt)=>{
//         if(err){
//             return next(err);
//             console.log("SAVE Func genSalt")
//         }
//         bcrypt.hash(user.password,salt,(err,hash)=>{
//             if(err){
//                 return next(err);
//                 console.log("SAVE Func hash")
//             }
//             user.password = hash;
//             next(); 
//             console.log("SAVE Func hash")
//         })
//     });

//     userSchema.methods.comparePassword = function(canddidatePassword){

//         console.log("User.js")
//         const user = this;
//         return new Promise((resolve,reject)=>{
//             bcrypt.compare(canddidatePassword,user.password,(err,isMatch)=>{
//                 if(err){
//                     return reject(err);
//                 }
//                 if(!isMatch){
//                     return reject(err);
//                 }
//                 resolve(true);
//             })
//         })
//     }

// })

mongoose.model('User',userSchema);