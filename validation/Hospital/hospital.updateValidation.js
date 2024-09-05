let joi=require("joi");

module.exports={

updateHospitalValidation:{
    body:joi.object().required().keys({

        hos_name:joi.string().empty().optional().messages({
        "string.base":"please enter a valid hos_name ",
        "string.empty":"hos_name cannot be empty",
      }),

      hos_address:joi.string().empty().optional().messages({
        "string.base":"please enter a valid hos_address ",
        "string.empty":"hos_address cannot be empty",
      }),

      hos_city:joi.string().empty().optional().messages({
        "string.base":"please enter a valid hos_city ",
        "string.empty":"hos_city cannot be empty",
      }),
 
  })
},

}