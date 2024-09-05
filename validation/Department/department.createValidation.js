let joi=require("joi");

module.exports={

createDepartmentValidation:{
    body:joi.object().required().keys({

        dep_name:joi.string().empty().required().messages({
        "string.base":"please enter a valid dep_name ",
        "string.empty":"dep_name cannot be empty",
        "any.required":"dep_name must be entered",
      }),

      hospital:joi.string().empty().required().messages({
        "string.base":"please enter a valid hospital ",
        "string.empty":"hospital cannot be empty",
        "any.required":"hospital must be entered",
      }),

  })
},

}