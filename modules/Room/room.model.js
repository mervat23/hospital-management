const mongoose=require("mongoose")

let roomSchema=mongoose.Schema({
    room_type:{type:String,required:true},
    room_number:{type:Number,required:true},
    status:{type:String,required:true},
    hospital: {
        type: mongoose.Types.ObjectId,
        ref: "hospitals"
    },

})

let roomModel=mongoose.model('room',roomSchema)
module.exports=roomModel