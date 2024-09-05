let joi=require("joi");

module.exports={

createHospitalValidation:{
    body:joi.object().required().keys({

        hos_name:joi.string().empty().required().messages({
        "string.base":"please enter a valid hos_name ",
        "string.empty":"hos_name cannot be empty",
        "any.required":"hos_name must be entered",
      }),

      hos_address:joi.string().empty().required().messages({
        "string.base":"please enter a valid hos_address ",
        "string.empty":"hos_address cannot be empty",
        "any.required":"hos_address must be entered",
      }),

      hos_city:joi.string().empty().required().messages({
        "string.base":"please enter a valid hos_city ",
        "string.empty":"hos_city cannot be empty",
        "any.required":"hos_city must be entered",
      }),
 
  })
},

}