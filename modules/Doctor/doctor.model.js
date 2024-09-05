const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
let saltrounds=5;

let doctorSchema=mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  specialization:{type:String,required:true},
  phone:{type:String,required:true},
  department:{
    type: mongoose.Types.ObjectId,
    ref: "departments"
  },   
  role:{type:String,required:true},   

})

doctorSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,saltrounds);
    next();
  })

let doctorModel=mongoose.model('doctor',doctorSchema)
module.exports=doctorModel