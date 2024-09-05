let joi=require("joi");

module.exports={

createPaymentValidation:{
    body:joi.object().required().keys({
        amount:joi.number().required().messages({
        "number.base":"please enter a valid amount ",
        "any.required":"amount must be entered",
      }),

      patient:joi.string().empty().required().messages({
        "string.base":"please enter a valid patient ",
        "string.empty":"patient cannot be empty",
        "any.required":"patient must be entered",
      }),

      appointment:joi.string().empty().required().messages({
        "string.base":"please enter a valid  appointment",
        "string.empty":"appointment cannot be empty",
        "any.required":"appointment must be entered",
      }),

      method:joi.string().empty().required().messages({
        "string.base":"please enter a valid  method",
        "string.empty":"method cannot be empty",
        "any.required":"method must be entered",
      }),


  })
},

}