const mongoos=require("mongoose")

//database url from mongoose database
const dburl="mongodb+srv://loki:Lokendrasharma%403211@socialmediaapp.dlwy6mn.mongodb.net/SocialmediaData?retryWrites=true&w=majority"
mongoos.connect(dburl)
.then((result)=>console.log("Database connected"))
module.exports=dburl