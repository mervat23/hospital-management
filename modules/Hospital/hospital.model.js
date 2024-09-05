const mongoose=require("mongoose")

let hospitalSchema=mongoose.Schema({
    hos_name:{type:String,required:true},
    hos_address:{type:String,required:true},
    hos_city:{type:String,required:true},
})

let hospitalModel=mongoose.model('hospitals',hospitalSchema)
module.exports=hospitalModel