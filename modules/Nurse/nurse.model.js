const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
let saltrounds=5;

let nurseSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    phone:{type:String,required:true},
    department: {
        type: mongoose.Types.ObjectId,
        ref: "departments"
      }, 
      role:{type:String,required:true},   
  
    // patients: [
    //     {
    //         _id: { type: mongoose.Types.ObjectId, ref: "patients" },
    //         patient: {
    //           type: Object
    //         },
    //        name:String,
    //        gender:String 
    //     }
    // ],
    // doctor_id:{type:mongoose.Types.ObjectId},
    // hospital: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "hospitals"
    // },    
})

nurseSchema.pre('save',async function(next){
 this.password=await bcrypt.hash(this.password,saltrounds)
 next()
})
let nurseModel=mongoose.model('nurse',nurseSchema)
module.exports=nurseModel
