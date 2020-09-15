const express =  require("express");
const app = express();
const PORT = 3000;
const   mongoose = require("mongoose");

var bodyParser = require("body-parser");
const {mongoUrl} = require('./keys');
 
 

require('./modules/User');
const authRoutes = require('./routes/authRoutes'); 
const requireToekn = require('./middleware/requireToken')
app.use(bodyParser.json());
app.use(authRoutes);
 
mongoose.connect(mongoUrl,{
    useNewUrlParser : true,
    useUnifiedTopology:true
});
 
mongoose.connection.on('connected',()=>{
    console.log("connetec to mongo");
}); 
 
  

app.get('/',requireToekn,(req,res)=>{
    res.send("your email is "+ req.user.email)
})
app.listen(PORT,()=>{
    console.log("server runnng :" + PORT)
})