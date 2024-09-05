let joi=require("joi");

module.exports={

updateAppointmentValidation:{
    body:joi.object().required().keys({

        date_time:joi.string().empty().optional().messages({
        "string.base":"please enter a valid date_time ",
        "string.empty":"date_time cannot be empty",
      }),

      doctor:joi.string().empty().messages({
        "string.base":"please enter a valid doctor ",
        "string.empty":"doctor cannot be empty",
      }),

      patient:joi.string().empty().messages({
        "string.base":"please enter a valid patient",
        "string.empty":"patient cannot be empty",
      }),

  })
},

}