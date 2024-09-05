const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
let saltrounds=5;

let employeeSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    phone:{type:String,required:true},
    position:{type:String,required:true},
    hospital: {
        type: mongoose.Types.ObjectId,
        ref: "hospitals"
    },
    role:{type:String,required:true},   

})
employeeSchema.pre('save',async function(next){
 this.password=await bcrypt.hash(this.password,saltrounds)
 next()
})
let employeeModel=mongoose.model('employee',employeeSchema)
module.exports=employeeModel