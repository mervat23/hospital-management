const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
let saltrounds=5;

let patientSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    phone:{type:String,required:true},
    gender:{type:String,required:true},
    role:{type:String,required:true},   

})
patientSchema.pre('save',async function(next){
 this.password=await bcrypt.hash(this.password,saltrounds)
 next()
})
let patientModel=mongoose.model('patient',patientSchema)
module.exports=patientModel