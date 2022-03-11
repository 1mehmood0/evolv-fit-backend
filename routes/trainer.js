const router=require("express").Router();
const Trainer=require("../models/trainers");

//CREATING NEW TRIANER
router.post("/create",async(req,res)=>{
    const newTrainer=new Trainer({
        name:req.body.name,
        email:req.body.email,
        userRefs:User._id
    });
    try{
    const savedTrainer=await newTrainer.save();
    res.status(200).send(savedTrainer);
    }
    catch(e)
    {
        res.status(500).send(e);
    }
})


module.exports=router;