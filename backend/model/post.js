const mongoo=require("mongoose")

const postschema=new mongoo.Schema({
    userid:{
   type:String,
   require:true,
    },
    des:{
   type:String,
   max:50
    },
 img:{
    type:String
 },
 likes:{
    type:Array,
    default:[]
 }
},
{timestamps:true}
)
module.exports=mongoo.model("post",postschema)