const routs=require("express").Router()
const mongoos=require("mongoose")
const User=require("../model/users")

//regestration user
routs.post("/regestration",async(req,res)=>{
  const newuser= new User({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password

  })
  await newuser.save()
  res.send("Data added to database")
})

//login user
routs.get("/login",async(req,res)=>{
    const userfound= await User.findOne({email:req.body.email})
    const passwordfound= await User.findOne({password:req.body.password})
    if(!userfound || !passwordfound){
        res.send("Email or password not found")
    }else{
        res.send(userfound)
    }
})

module.exports=routs