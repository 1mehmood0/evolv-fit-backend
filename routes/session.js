const router=require("express").Router();
const Session=require("../models/WorkoutPnP/session");
const mongoose=require("mongoose")

router.post("/create",async(req,res)=>{
        const newSession=await new Session({
        workout:{
            exercises:[
                {
                    exerciseInfoRef:new mongoose.Types.ObjectId(),
                    name:req.body.workout.exercises.name,
                    exerciseSets: [{
                            number: req.body.workout.exercises[0].exerciseSets[0].setCount,
                            suggestedWeight: req.body.workout.exercises[0].exerciseSets[0].suggestedWeight,
                            suggestedReps:req.body.workout.exercises[0].exerciseSets[0].suggestedReps
                        },
                        {
                            number: req.body.workout.exercises[0].exerciseSets[1].setCount,
                            suggestedWeight: req.body.workout.exercises[0].exerciseSets[1].suggestedWeight,
                            suggestedReps:req.body.workout.exercises[0].exerciseSets[1].suggestedReps
                           
                        },
                        {
                            number: req.body.workout.exercises[0].exerciseSets[2].setCount,
                            suggestedWeight: req.body.workout.exercises[0].exerciseSets[2].suggestedWeight,
                            suggestedReps:req.body.workout.exercises[0].exerciseSets[2].suggestedReps
                               
                        }]
                    },
                    {
                    exerciseInfoRef:new mongoose.Types.ObjectId(),
                    name:req.body.workout.exercises.name,
                    exerciseSets: [{
                        number: req.body.workout.exercises[1].exerciseSets[0].setCount,
                        suggestedWeight: req.body.workout.exercises[1].exerciseSets[0].suggestedWeight,
                        suggestedReps:req.body.workout.exercises[1].exerciseSets[0].suggestedReps
                    },
                    {
                        number: req.body.workout.exercises[1].exerciseSets[1].setCount,
                        suggestedWeight: req.body.workout.exercises[1].exerciseSets[1].suggestedWeight,
                        suggestedReps:req.body.workout.exercises[1].exerciseSets[1].suggestedReps
                       
                    },
                    {
                        number: req.body.workout.exercises[1].exerciseSets[2].setCount,
                        suggestedWeight: req.body.workout.exercises[1].exerciseSets[2].suggestedWeight,
                        suggestedReps:req.body.workout.exercises[1].exerciseSets[2].suggestedReps
                           
                    }]
                        }
            ]   
        },
        date:req.body.date,
        userRef:req.body.userRef,
        trainerRef:req.body.trainerRef
        });
        try{
       const savedSession= await newSession.save();
        res.status(200).send(savedSession);
    }
    catch(e)
    {
        res.status(500).send(e);
    }
})

//UPDATE (LVL-2B) with using the id of session and can be removed if want to
router.put("/update/:id",async(req,res)=>{
    try{
        const filter={_id:req.params.id};
   const updatedSession= await Session.findOne(filter);
  
    updatedSession.workout.exercises[0].exerciseSets[0]["performedReps"]=req.body.performedReps;
    await updatedSession.save();
    updatedSession.workout.exercises[0].exerciseSets[0].performedWeight=req.body.performedWeights;
    const result=await updatedSession.save();
    console.log(result);
    res.send(result);

    }
    catch(e){
        res.status(500).send(e);
    }
});


//UPDATE DATE in the SESSION COLLECTION with userRef._id if (isCompleted=False)
router.put("/update/date/:id",async(req,res)=>{
    const filter=req.params.id;
    const checkDate=req.body.date;
    console.log(checkDate,filter)
    try{
        const fetchedSession=await Session.find({isCompleted:false});
        console.log(fetchedSession);
       const upDate=fetchedSession.map((x)=>{

            let dateMs=new Date(x.date).getTime()+86400000;
            x.date=new Date(dateMs).toISOString();

           Session.findByIdAndUpdate(x._id,{$set:{date:x.date}},(err,data)=>{
                if(err)
                console.log(err,"NOTsaved to DB new DATE");
            });
            return x;
        });
        // await fetchedSession.save();
         console.log(upDate,"<----UPDATED DATE"); 
        res.send(upDate);
    }
    catch(e){
        res.status(500).send(e);
    }

})

router.get("/:id",async(req,res)=>{
   const getSession=await Session.findById(req.params.id).populate("trainerRef").populate("userRef").populate("trainerRef");
   res.status(200).send(getSession);
});

module.exports=router;