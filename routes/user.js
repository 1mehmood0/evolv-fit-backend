const router=require("express").Router();
const { Session } = require("inspector");
const User=require("../models/users");

router.post("/create",async(req,res)=>{
    const newUser=new User({
        email:req.body.email,
        name:req.body.name,
        gender:req.body.gender,
        DOB:req.body.DOB,
        phone:req.body.phone,
        trainerRef:req.body.trainerId,
        sessions:req.body.sessionId, 
        });
    try{
        const savedUser=await newUser.save();
        res.status(200).send(savedUser);
        }
        catch(e){
            res.status(500).send(e);
        }
})
router.get("/:id",async(req,res)=>{
    try{
        const getUser=await User.findById(req.params.id)
        .populate("trainerRef");
        console.log(getUser);
        res.status(200).send(getUser);
    }
    catch(e)
    {
        res.status.send(e);
    }
})

module.exports=router;