let joi=require("joi");

module.exports={

createRecordValidation:{
    body:joi.object().required().keys({
        record_no:joi.number().required().messages({
        "number.base":"please enter a valid record_no ",
        "any.required":"record_no must be entered",
      }),

      diagnosis:joi.string().empty().required().messages({
        "string.base":"please enter a valid  diagnosis ",
        "string.empty":" diagnosis cannot be empty",
        "any.required":" diagnosis must be entered",
      }),

      treatment :joi.string().empty().required().messages({
        "string.base":"please enter a valid treatment ",
        "string.empty":" treatment cannot be empty",
        "any.required":" treatment must be entered",
      }),
      
      admission_date:joi.date().optional().messages({
        "date.base":"please enter a valid admission_date ",

      }),
      
      discharge_date:joi.date().optional().messages({
        "date.base":"please enter a valid discharge_date ",
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