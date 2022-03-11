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

router.get("/:id",async(req,res)=>{
   const getSession=await Session.findById(req.params.id).populate("trainerRef").populate("userRef").populate("trainerRef");
   res.status(200).send(getSession);
});

module.exports=router;