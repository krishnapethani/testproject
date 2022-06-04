const express = require("express");
const bodyParser = require('body-parser')
const userModel=require("../src/models/usermodel");
const async = require("hbs/lib/async");
const app = express();
require('./db/conn');

const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.post("/regirster", async (req,res)  => {
    console.log("req.body",req.body);
    const today = new Date();
    const birthDate = new Date(req.body.DOB);
    const age = today.getFullYear() - birthDate.getFullYear();
    console.log("today",today );
    console.log("birthDate",birthDate);
    console.log("age",age);
    if(age<=14)
    {res.send("Age should be above 14 years" )}
    else{
        const user={
            name:req.body.name,
            Email:req.body.Email,
            city:req.body.city,
            password:req.body.password,
            DOB:req.body.DOB,
        }
        const userdata= await new userModel(user)
        await userdata.save().then(
            data=>{
                res.send("User has been registered successfully")
            }
        )
    
    }
});


app.get("/userdata", async (req,res)  => {
    const user =await userModel.find()
    if(user){
        res.send(user)
    
    }
    else{
        res.send("Couldn’t connect to Database.")
    }
});


app.listen(port, () => {
    console.log(`server is running at port no ${port}`)
})