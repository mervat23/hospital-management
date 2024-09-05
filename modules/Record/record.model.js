const mongoose=require("mongoose")

let recordSchema=mongoose.Schema({
  record_no:{type:Number,required:true},
  diagnosis:{type:String,required:true},
  treatment:{type:String,required:true},
  admission_date:{type:Date},
  discharge_date:{type:Date},
  patient:{type:mongoose.Types.ObjectId},
  doctor:{type:mongoose.Types.ObjectId},
 

})

let recordModel=mongoose.model('record',recordSchema)
module.exports=recordModel