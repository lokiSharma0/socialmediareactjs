const routes=require("express").Router()
const mongoos=require("mongoose")
const User=require("../model/users")

//find user
routes.get("/search",async(req,res)=>{
   const search= await User.findOne({username:req.body.username})
   if(!search){
    res.send("No user found")
   }else{
    res.send(search)
   }
})


//delete user
routes.delete("/delete",async(req,res)=>{
const userfound=await User.findOne({username:req.body.username})
if(!userfound){
    res.send("No user to delete")
}else{
    try{
     userfound.delete()
    res.send("User deleted")

    }catch(err){
        console.log(err);
    }
}
})

//update user
routes.put("/update",async(req,res)=>{
const userfoundforupdate=await User.findOne({username:req.body.username})
if(!userfoundforupdate){
    res.send("User not found so cannot update")
}else{
    try{
   await User.updateOne({userfoundforupdate},{$set:req.body})
    res.send("user updated")
    }catch(err){
        console.log(err);
    }
}
})

//foloow post
routes.put("/follow/:id",async(req,res)=>{
if(req.params.id !==req.body.id){
try{
    const user=await User.findById(req.params.id)
    const currentuser= await User.findById(req.body.id)
     if(!user.followers.includes(req.body.id)){
     await user.updateOne({$push:{followers:req.body.id}})
     await currentuser.updateOne({$push:{following:req.params.id}})
     res.send("User followed")
    }else{
        res.send("Already following")
    }

}catch(err){

}
}else{
    res.send("You cannot follow yourself")
}
})


//unfollow post
routes.put("/unfollow/:id",async(req,res)=>{
    if(req.params.id !==req.body.id){
    try{
        const user=await User.findById(req.params.id)
        const currentuser= await User.findById(req.body.id)
         if(user.followers.includes(req.body.id)){
         await user.updateOne({$pull:{followers:req.body.id}})
         await currentuser.updateOne({$pull:{following:req.params.id}})
         res.send("User unfollowed")
        }else{
            res.send("unfollowing")
        }
    
    }catch(err){
    
    }
    }else{
        res.send("You cannot unfollow yourself")
    }
    })
module.exports=routes