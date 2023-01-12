const routes=require("express").Router()
const mongoos=require("mongoose")
const Post=require("../model/post")


//create post
routes.get("/create",async(req,res)=>{
    const post =new Post({
        userid:req.body.userid,
        des:req.body.des,
        img:req.body.img
    })
   const newpost=await post.save()
   res.send(newpost)
})
//find a post
routes.get("/search",async(req,res)=>{
    const foundpost= await Post.findOne({userid:req.body.id})
    if(!foundpost){
        res.send("No post from this user id found")
    }else{
        res.send(foundpost)
    }
})
//delete post
routes.delete("/delete",async(req,res)=>{
const findpost=await Post.findOne({userid:req.body.userid})
if(!findpost){
    res.send("no post found")
}else{
    await findpost.delete()
    res.send("post deleted")
}
})
//update post
routes.put("/updatepost",async(req,res)=>{
    const findapostfromdatabase=await Post.findOne({userid:req.body.userid})
    if(!findapostfromdatabase){
        res.send("cannot find the user id to update the post")
    }else{
    await Post.updateOne({findapostfromdatabase},{$set:req.body})
    res.send("post updated")
    }
})
//like apost
routes.put("/like/:id",async(req,res)=>{
    const findapostfromdatabase=await Post.findById(req.params.id)
    if(!findapostfromdatabase.likes.includes(req.body.userid)){
        await findapostfromdatabase.updateOne({$push:{likes:req.body.userid}})
        res.send("post liked")
    }else if(findapostfromdatabase.likes.includes(req.body.userid)){
   await findapostfromdatabase.updateOne({$pull:{likes:req.body.userid}})
   res.send("post disliked")
    }

})





module.exports=routes