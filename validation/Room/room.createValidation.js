let joi=require("joi");

module.exports={

createRoomValidation:{
    body:joi.object().required().keys({
        room_type:joi.string().empty().required().messages({
        "string.base":"please enter a valid room_type",
        "string.empty":"room_type cannot be empty",
        "any.required":"room_type must be entered",
      }),

      room_number:joi.number().required().messages({
        "number.base":"please enter a valid room_number",
        "any.required":"room_number must be entered",
      }),

      status:joi.string().empty().required().messages({
        "string.base":"please enter a valid status",
        "string.empty":"status cannot be empty",
        "any.required":"status must be entered",
      }),

      hospital:joi.string().empty().required().messages({
        "string.base":"please enter a valid hospital ",
        "string.empty":"hospital cannot be empty",
        "any.required":"hospital must be entered",
      }),

  })
},

}