let joi=require("joi");

module.exports={

updateRoomValidation:{
    body:joi.object().required().keys({
        room_type:joi.string().empty().optional().messages({
        "string.base":"please enter a valid room_type",
        "string.empty":"room_type cannot be empty",
      }),

      room_number:joi.number().optional().messages({
        "number.base":"please enter a valid room_number",
      }),

      status:joi.string().empty().optional().messages({
        "string.base":"please enter a valid status",
        "string.empty":"status cannot be empty",
      }),

      hospital:joi.string().empty().optional().messages({
        "string.base":"please enter a valid hospital ",
        "string.empty":"hospital cannot be empty",
      }),

  })
},

}