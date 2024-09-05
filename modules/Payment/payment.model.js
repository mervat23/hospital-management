const mongoose=require("mongoose")

let paymentSchema=mongoose.Schema({
    patient:{type:mongoose.Types.ObjectId},
    appointment:{type:mongoose.Types.ObjectId},
    amount:{type:Number,required:true},
    method: {
        type: String,
        enum: ["paypal"],
        required: true,
      },
})

let paymentModel=mongoose.model('payment',paymentSchema)
module.exports=paymentModel