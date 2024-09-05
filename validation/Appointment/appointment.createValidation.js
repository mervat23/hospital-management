let joi=require("joi");

module.exports={

createAppointmentValidation:{
    body:joi.object().required().keys({
        date_time:joi.string().empty().required().messages({
        "string.base":"please enter a valid date_time ",
        "string.empty":"date_time cannot be empty",
        "any.required":"date_time must be entered",
      }),

      doctor:joi.string().empty().required().messages({
        "string.base":"please enter a valid doctor ",
        "string.empty":"doctor cannot be empty",
        "any.required":"doctor must be entered",
      }),

      patient:joi.string().empty().required().messages({
        "string.base":"please enter a valid patient",
        "string.empty":"patient cannot be empty",
        "any.required":"patient must be entered",
      }),

  })
},

}