# evolv-fit-backend

``{{BASE_URL}}=localhost:PORT/api``

1-><i><u>{{BASE_URL}}/trainers/create</i></u>
     <br>
    IT CREATES A TRAINER 

2->{{BASE_URL}}/users/create<br>
    IT CREATES A USER WITH "trainerId" in the body.
    
    
    {
    "email":"user1@gmail.com",
    "name":"yashdixit",
    "gender":"M",
    "DOB":"01/03/2000",
    "phone":"9876543210",
    "trainerId":"6228eeca24d65380b73dfb965"
    }
    

3->{{BASE_URL}}/users/id<br>
    IT GETS THE USER WITH TRAINER FIELD POPULATED AND HENCE MAPPED TO IT.

4->{{BASE_URL}}/sessions/create<br>
    IT CREATES A SESSION WITH JSON BELOW IN THE BODY. THIS WAS SLIGHTLY TOUGH FOR LINKING THE SCHEMA.

  ```
   {
    "workout":{
    "exercises":[
        {
            "name":"Pushups",
            "exerciseSets":[
                {
                    "setCount":"222",
                    "suggestedWeight":"152",
                    "suggestedReps":"100"
                },
                {
                    "setCount":"15",
                    "suggestedWeight":"20",
                    "suggestedReps":"15"
                },
                {
                    "setCount":"10",
                    "suggestedWeight":"25",
                    "suggestedReps":"20"
                }
            ]
        },
        {
            "name":"Squats",
            "exerciseSets":[
                {
                    "setCount":"25",
                    "suggestedWeight":"50",
                    "suggestedReps":"10"
                },
                {
                    "setCount":"15",
                    "suggestedWeight":"60",
                    "suggestedReps":"15"
                },
                {
                    "setCount":"10",
                    "suggestedWeight":"65",
                    "suggestedReps":"20"
                }
            ]
        }
    ]
  },
"date":"2022-03-10",
"userRef":"6228f121d9bfbd45651c01ca",
"trainerRef":"6228eeca24d65380b73dfb93"
}
```

5->{{BASE_URL}}/sessions/(Session._id)<br>
   IT GETS THE SESSION WITH ALL THE FIELDS POPULATED.

6->{{BASE_URL}}/sessions/update/(Session._id)<br>
   IT UPDATES THE 1st set of the 1st exercise TO ADD ATTRIBUTES {performedWeight, performedReps}.
   ADD THIS JSON IN THE BODY TO UPDATE THE ATTRIBUTE. LOCATION OF UPDATION IS HARDCODED.

   ```
    {
    "performedReps":"30",
    "performedWeights":"40"
    }
   ```
   ![image](https://user-images.githubusercontent.com/57150979/158039821-ec42c94e-ede3-462c-ab7b-e377d3c68b75.png)


7-> CREATED 3 SESSIONS AS PER THE GUIDELINES

8->{{BASE_URL}}/sessions/update/date/(userRef._id)<br>
   IT ACCEPTS A DATE IN THE BODY.IT GETS ALL THE SESSION AND UPDATES THE DATE BY 1 DAY IF THE SESSION IS NOT COMPLETED OF THAT USER
   
   ```
   {
    "date":"2022-03-09"
   }
