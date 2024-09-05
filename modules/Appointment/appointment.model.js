const mongoose=require("mongoose")

let appointmentSchema=mongoose.Schema({
    patient:{type:mongoose.Types.ObjectId},
    doctor:{type:mongoose.Types.ObjectId},
    date_time:{type:String,required:true},
})

let appointmentModel=mongoose.model('appointment',appointmentSchema)
module.exports=appointmentModel