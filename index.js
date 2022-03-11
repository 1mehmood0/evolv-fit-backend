const express=require('express');
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const port=process.env.PORT||8080;


dotenv.config();


const trainerRouter=require("./routes/trainer");
const userRouter=require("./routes/user");
const sessionRouter=require("./routes/session");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/trainers",trainerRouter);
app.use("/api/users",userRouter);
app.use("/api/sessions",sessionRouter);


mongoose.connect(process.env.ATLAS_URL)
  .then(()=>{
    console.log("DB connection successful");
    
  })
  .catch((e)=>{
      console.log(e);
  }); 
  

app.listen(port,()=>{
    console.log(`Server running on port no ${port}`);
  
});