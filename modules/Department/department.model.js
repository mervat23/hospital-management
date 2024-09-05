const mongoose=require("mongoose")

let departmentSchema=mongoose.Schema({
    dep_name:{type:String,required:true},
    hospital: {
        type: mongoose.Types.ObjectId,
        ref: "hospitals"
      },   
    
})

let departmentModel=mongoose.model('departments',departmentSchema)
module.exports=departmentModel