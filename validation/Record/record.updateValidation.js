let joi=require("joi");

module.exports={

updateRecordValidation:{
    body:joi.object().required().keys({
        record_no:joi.number().optional().messages({
        "number.base":"please enter a valid record_no ",
      }),

      diagnosis:joi.string().empty().optional().messages({
        "string.base":"please enter a valid  diagnosis ",
        "string.empty":" diagnosis cannot be empty",
      }),

      treatment :joi.string().empty().optional().messages({
        "string.base":"please enter a valid treatment ",
        "string.empty":" treatment cannot be empty",
      }),
      
      admission_date:joi.date().optional().messages({
        "date.base":"please enter a valid admission_date ",
      }),
      
      discharge_date:joi.date().optional().messages({
        "date.base":"please enter a valid discharge_date ",
      }),
      
      doctor:joi.string().empty().optional().messages({
        "string.base":"please enter a valid doctor ",
        "string.empty":"doctor cannot be empty",
      }),

      patient:joi.string().empty().optional().messages({
        "string.base":"please enter a valid patient",
        "string.empty":"patient cannot be empty",
      }),
      
  })
},

}