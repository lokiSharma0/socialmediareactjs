const mongoo=require("mongoose")
const usershcme=new mongoo.Schema({
  username:{
    type:String,
    require:true,
    unique:true,
    min:3,
    max:20
  },
  email:{
    type:String,
    require:true,
    unique:true,
    min:5,
    max:30
  },
  password:{
    type:String,
    unique:true,
    min:4,
    max:20,
    require:true
  },
  followers:{
    type:Array,
    default:[]
  },
  following:{
    type:Array,
    default:[]
  },
  isAdmin:{
    type:Boolean,
    default:false
  }

},{timestamps:true})
module.exports=mongoo.model("users",usershcme)